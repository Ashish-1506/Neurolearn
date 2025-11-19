import { CognitiveState } from '../types';

interface DebugStateSelectorProps {
    onStateChange: (state: CognitiveState | 'auto') => void;
    currentState: CognitiveState | 'auto' | null;
}

const STATES: (CognitiveState | 'auto')[] = ['auto', 'focused', 'neutral', 'distracted', 'drowsy'];

const DebugStateSelector = ({ onStateChange, currentState }: DebugStateSelectorProps) => {
    
    const handleStateClick = (state: CognitiveState | 'auto') => {
        onStateChange(state);
    };

    return (
        <div className="flex items-center space-x-1 bg-dark-bg/50 p-1 rounded-lg border border-dark-border">
            {STATES.map(state => (
                <button
                    key={state}
                    onClick={() => handleStateClick(state)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 capitalize ${
                        currentState === state
                            ? state === 'auto'
                                ? 'bg-accent-orange text-white shadow-glow-orange'
                                : 'bg-accent-blue text-white shadow-glow-blue'
                            : 'bg-transparent text-text-secondary hover:bg-dark-panel'
                    }`}
                >
                    {state}
                </button>
            ))}
        </div>
    );
};

export default DebugStateSelector;
