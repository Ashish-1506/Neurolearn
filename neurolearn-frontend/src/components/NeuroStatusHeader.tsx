import { BrainCircuit } from 'lucide-react';
import { ClassifierCognitiveState } from '../types';
import RawEEGChart from './RawEEGChart';

interface NeuroStatusHeaderProps {
    title: string;
    status: ClassifierCognitiveState;
    rawEEGData: number[];
    isPulsing: boolean;
    children?: React.ReactNode;
}

const statusConfig = {
    focused: { text: 'Focused', color: 'text-accent-green', iconColor: 'text-accent-green' },
    distracted: { text: 'Distracted', color: 'text-accent-yellow', iconColor: 'text-accent-yellow' },
    drowsy: { text: 'Drowsy', color: 'text-accent-red', iconColor: 'text-accent-red' },
    neutral: { text: 'Neutral', color: 'text-text-secondary', iconColor: 'text-text-secondary' },
    analyzing: { text: 'Analyzing...', color: 'text-text-muted', iconColor: 'text-text-muted' }
};

const NeuroStatusHeader = ({ title, status, rawEEGData, isPulsing, children }: NeuroStatusHeaderProps) => {
    const config = statusConfig[status] || statusConfig.neutral;

    const getPulseClass = () => {
        if (!isPulsing) return '';
        switch (status) {
            case 'distracted': return 'animate-pulse-yellow';
            case 'focused': return 'animate-pulse-green';
            default: return 'animate-pulse-blue';
        }
    };

    return (
        <header className="absolute top-0 left-0 right-0 h-20 bg-dark-panel/80 backdrop-blur-sm border-b border-dark-border z-10 flex items-center justify-between px-6">
            <div>
                <h1 className="text-xl font-bold text-text-light">{title}</h1>
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <div className={`relative ${getPulseClass()}`}>
                        <BrainCircuit size={28} className={config.iconColor} />
                    </div>
                    <span className={`text-lg font-semibold ${config.color}`}>{config.text}</span>
                </div>
                {children}
                <div className="w-48 h-12">
                    <RawEEGChart data={rawEEGData} />
                </div>
            </div>
        </header>
    );
};

export default NeuroStatusHeader;
