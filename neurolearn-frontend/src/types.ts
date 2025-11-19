export type CognitiveState = 'focused' | 'distracted' | 'drowsy' | 'neutral' | 'analyzing';

export type ClassifierCognitiveState = CognitiveState;

export interface EEGDataPoint {
  timestamp: string;
  state: CognitiveState;
  eeg: number[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

export interface AppStatus {
    predictedState: ClassifierCognitiveState;
    backendState: CognitiveState;
}

export type RawEEGData = number[];
