const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8080;

// --- Cognitive State Simulation ---
const COGNITIVE_STATES = ['neutral', 'focused', 'distracted', 'drowsy'];
let currentSimulatedCognitiveState = 'neutral';

// State transition probabilities
const transitionMatrix = {
  neutral: { focused: 0.4, distracted: 0.3, drowsy: 0.1, neutral: 0.2 },
  focused: { focused: 0.6, neutral: 0.3, distracted: 0.1, drowsy: 0.0 },
  distracted: { distracted: 0.4, neutral: 0.5, focused: 0.1, drowsy: 0.0 },
  drowsy: { drowsy: 0.5, neutral: 0.5, focused: 0.0, distracted: 0.0 },
};

function transitionState() {
  const transitions = transitionMatrix[currentSimulatedCognitiveState];
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const state in transitions) {
    cumulativeProbability += transitions[state];
    if (rand < cumulativeProbability) {
      currentSimulatedCognitiveState = state;
      return;
    }
  }
}

// --- EEG Data Simulation ---
function generateEEGData(state) {
  const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(4));
  let data = new Array(8).fill(0);

  switch (state) {
    case 'focused':
      // Low amplitude, stable
      data = data.map(() => randomFloat(0.05, 0.15));
      break;
    case 'distracted':
      // Erratic, high variance, mid-to-high amplitude
      data = data.map(() => randomFloat(0.1, 0.9));
      break;
    case 'drowsy':
      // Slow, sine-wave-like, high amplitude
      const phase = Date.now() / 1000;
      data = data.map((_, i) => parseFloat((0.725 + 0.225 * Math.sin(phase + i / 2)).toFixed(4)));
      break;
    case 'neutral':
    default:
      // Balanced, mid-range amplitude
      data = data.map(() => randomFloat(0.2, 0.5));
      break;
  }
  return data;
}

// --- WebSocket Server Logic ---
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

function broadcastEEGData() {
  transitionState(); // Update state first
  const eegData = generateEEGData(currentSimulatedCognitiveState);
  const message = {
    timestamp: new Date().toISOString(),
    state: currentSimulatedCognitiveState,
    eeg: eegData,
  };

  const messageString = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(messageString);
    }
  });
}

setInterval(broadcastEEGData, 2000);

// --- API Endpoints ---
app.post('/api/generate-mnemonic', (req, res) => {
  const { topic } = req.body;
  console.log(`Generating mnemonic for: ${topic}`);

  // Simulate AI delay and dynamic response
  setTimeout(() => {
    const patterns = [
        `To remember '${topic}', try associating it with a vivid image, like a glowing brain connecting ideas.`,
        `A helpful mnemonic for '${topic}' is to create a story where each part of the topic is a character.`,
        `For '${topic}', break it down into smaller parts and find a rhythm in their names.`,
        `Think about this for '${topic}': The more you connect it to what you already know, the stronger the memory.`,
    ];
    const mnemonic = patterns[Math.floor(Math.random() * patterns.length)];
    res.json({ mnemonic });
  }, 1500);
});

app.post('/api/set-state', (req, res) => {
  const { state } = req.body;
  if (COGNITIVE_STATES.includes(state)) {
    currentSimulatedCognitiveState = state;
    console.log(`Cognitive state forced to: ${state}`);
    // Immediately broadcast the new state
    broadcastEEGData();
    res.json({ success: true, message: `State set to ${state}` });
  } else {
    res.status(400).json({ success: false, message: 'Invalid state provided.' });
  }
});

// --- Server Start ---
server.listen(PORT, () => {
  console.log(`NeuroLearn Backend running on http://localhost:${PORT}`);
});
