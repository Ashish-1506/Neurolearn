import * as brain from 'brain.js';
import { CognitiveState } from '../types';

// Mimicking the backend simulation patterns for training
const trainingData = [
  // Focused
  { input: [0.06, 0.11, 0.08, 0.14, 0.09, 0.12, 0.07, 0.13], output: { focused: 1 } },
  { input: [0.05, 0.10, 0.09, 0.11, 0.13, 0.08, 0.10, 0.14], output: { focused: 1 } },
  { input: [0.10, 0.08, 0.12, 0.06, 0.11, 0.09, 0.13, 0.07], output: { focused: 1 } },

  // Distracted
  { input: [0.2, 0.8, 0.1, 0.9, 0.3, 0.7, 0.2, 0.85], output: { distracted: 1 } },
  { input: [0.7, 0.2, 0.8, 0.1, 0.9, 0.3, 0.6, 0.4], output: { distracted: 1 } },
  { input: [0.5, 0.6, 0.4, 0.7, 0.3, 0.8, 0.2, 0.9], output: { distracted: 1 } },

  // Drowsy
  { input: [0.50, 0.71, 0.90, 0.99, 0.95, 0.78, 0.55, 0.34], output: { drowsy: 1 } },
  { input: [0.85, 0.98, 0.95, 0.78, 0.55, 0.34, 0.21, 0.15], output: { drowsy: 1 } },
  { input: [0.21, 0.34, 0.55, 0.78, 0.95, 0.98, 0.85, 0.65], output: { drowsy: 1 } },

  // Neutral
  { input: [0.3, 0.4, 0.25, 0.45, 0.35, 0.2, 0.4, 0.33], output: { neutral: 1 } },
  { input: [0.4, 0.3, 0.45, 0.25, 0.2, 0.35, 0.33, 0.41], output: { neutral: 1 } },
  { input: [0.22, 0.38, 0.42, 0.29, 0.31, 0.48, 0.25, 0.36], output: { neutral: 1 } },
];

const net = new brain.NeuralNetwork();
net.train(trainingData);

export function classifyEEG(eegData: number[]): CognitiveState {
    const result = brain.likely(eegData, net);
    return result as CognitiveState;
}
