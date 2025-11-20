# NeuroLearn 🧠

**NeuroLearn** is a next-generation adaptive learning platform that integrates simulated Brain-Computer Interface (BCI) technology to personalize the educational experience in real-time. By monitoring cognitive states such as focus, distraction, and drowsiness, NeuroLearn dynamically adjusts the learning environment to optimize retention and engagement.

> **Built with ❤️ by Team Jarvis**

---

## 🚀 Key Features

- **Real-Time Cognitive Monitoring**: Visualizes simulated EEG data and classifies cognitive states (Focused, Neutral, Distracted, Drowsy) instantly.
- **Adaptive Learning Interface**:
  - **Focus**: Clean, distraction-free interface.
  - **Distraction**: Gentle nudges, ambient pulsing, and mnemonic aids to guide attention back.
  - **Drowsiness**: Active interventions and "wake-up" exercises.
- **Cyber-Neuro Aesthetic**: A high-fidelity, dark-mode UI featuring glowing accents, smooth animations, and futuristic data visualizations.
- **Interactive Course Library**: Engaging lessons across various subjects (Biology, Physics, CS, etc.) that respond to the user's mental state.
- **Progress Analytics**: Detailed charts and session breakdowns to track cognitive performance over time.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js / React Three Fiber
- **Data Visualization**: Chart.js / React-Chartjs-2
- **Icons**: Lucide React
- **Machine Learning**: Brain.js (Client-side neural network for state classification)

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Real-Time Communication**: WebSocket (`ws`)
- **Simulation**: Custom EEG data generation algorithms

---

## 📦 Installation & Setup

Follow these steps to get NeuroLearn running locally.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Ashish-1506/Neurolearn.git
cd neurolearn
```

### 2. Setup Backend
The backend simulates the EEG headset connection and streams data.

```bash
cd neurolearn-backend
npm install
npm start
```
*The backend server will start on `http://localhost:8080`.*

### 3. Setup Frontend
Open a new terminal window for the frontend application.

```bash
cd neurolearn-frontend
npm install
npm run dev
```
*The frontend will launch (usually at `http://localhost:5173`).*

---

## 📂 Project Structure

```
neurolearn/
├── neurolearn-backend/     # Node.js WebSocket Server
│   ├── server.js           # Main server entry point (EEG simulation)
│   └── package.json
│
├── neurolearn-frontend/    # React Application
│   ├── src/
│   │   ├── components/     # UI Components (Charts, Sidebar, Modals)
│   │   ├── data/           # Course and Lesson content
│   │   ├── ml/             # Brain.js Classifier logic
│   │   ├── pages/          # Application Routes (Dashboard, Courses)
│   │   ├── App.tsx         # Main App Component
│   │   └── main.tsx        # Entry point
│   └── package.json
│
└── README.md
```

---

## 👥 Credits

This project was conceptualized, designed, and engineered by **Team Jarvis**.

---

*© 2025 Team Jarvis. All Rights Reserved.*
