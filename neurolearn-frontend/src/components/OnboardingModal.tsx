import { useState, useEffect } from 'react';

interface OnboardingModalProps {
    onClose: () => void;
}

const OnboardingModal = ({ onClose }: OnboardingModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('neurolearn_onboarding_seen');
        if (!hasSeenOnboarding) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('neurolearn_onboarding_seen', 'true');
        setIsVisible(false);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-dark-panel border border-dark-border rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
                <h2 className="text-2xl font-bold text-accent-cyan mb-4">Welcome to NeuroLearn!</h2>
                <p className="text-text-secondary mb-6">
                    This is a prototype of an AI-powered learning platform that adapts to your cognitive state.
                    The system simulates brainwave (EEG) data to classify your focus level and provides interventions to help you learn better.
                </p>
                <button
                    onClick={handleClose}
                    className="bg-accent-violet text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-all"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default OnboardingModal;
