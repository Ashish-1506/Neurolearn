import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import NeuroStatusHeader from './components/NeuroStatusHeader';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import SettingsPage from './pages/SettingsPage';
import OnboardingModal from './components/OnboardingModal';
import NotificationToast from './components/NotificationToast';
import CourseDetailPage from './pages/CourseDetailPage';
import ProgressPage from './pages/ProgressPage';
import LoadingScreen from './components/LoadingScreen';
import { classifyEEG } from './ml/classifier';
import { AppStatus, ChartData, CognitiveState, EEGDataPoint, RawEEGData, ClassifierCognitiveState } from './types';
import { courseData } from './data/courses';
import DebugStateSelector from './components/DebugStateSelector';
import DrowsyIntervention from './components/DrowsyIntervention';
import EmojiRain from './components/EmojiRain';

const MAX_CHART_POINTS = 30;
const stateToValue = (state: CognitiveState): number => {
    switch (state) {
        case 'focused': return 2;
        case 'neutral': return 1.5;
        case 'distracted': return 1;
        case 'drowsy': return 0;
        default: return 1.5;
    }
};

const speak = (text: string, volume: number = 0.8, rate: number = 0.9, pitch: number = 1.0) => {
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.speak(utterance);
};


function App() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [currentStatus, setCurrentStatus] = useState<AppStatus>({ predictedState: 'analyzing', backendState: 'neutral' });
    const [rawEEGData, setRawEEGData] = useState<RawEEGData>(new Array(8).fill(0));
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const [interventionActive, setInterventionActive] = useState(false);
    const [distractionCount, setDistractionCount] = useState(0);
    const [isPulsing, setIsPulsing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [drowsyIntervention, setDrowsyIntervention] = useState(false);
    const [debugState, setDebugState] = useState<CognitiveState | 'auto'>('auto');
    const [showEmojiRain, setShowEmojiRain] = useState(false);

    const effectiveStatus = useMemo<ClassifierCognitiveState>(() => {
        return debugState === 'auto' ? currentStatus.predictedState : debugState;
    }, [debugState, currentStatus.predictedState]);

    const pageTitle = useMemo(() => {
        const path = location.pathname;
        const { lessonTitle } = location.state || {};

        if (path === '/' && lessonTitle) {
            return `Lesson: ${lessonTitle}`;
        }

        if (path.startsWith('/courses/')) {
            const parts = path.split('/');
            const courseId = parts[2];
            if (courseId) {
                const course = courseData[courseId];
                return course ? course.title : 'Course Not Found';
            }
        }
        switch (location.pathname) {
            case '/courses': return 'Course Library';
            case '/settings': return 'Settings';
            case '/progress': return 'Progress & Analytics';
            case '/':
            default: return 'Dashboard - Select a Lesson';
        }
    }, [location.pathname, location.state]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => console.log('WebSocket Connected');
        ws.onmessage = (event) => {
            const data: EEGDataPoint = JSON.parse(event.data);
            setRawEEGData(data.eeg);

            const predictedState = classifyEEG(data.eeg);
            setCurrentStatus({ predictedState, backendState: data.state });

            const stateToProcess = debugState === 'auto' ? predictedState : debugState;

            if (stateToProcess === 'focused' || stateToProcess === 'neutral') {
                setDistractionCount(0);
                setIsPulsing(false);
                setShowToast(false);
                setInterventionActive(false);
                setDrowsyIntervention(false);
            } else if (stateToProcess === 'distracted') {
                setDistractionCount(c => c + 1);
            } else if (stateToProcess === 'drowsy') {
                setDrowsyIntervention(true);
            }

            setChartData(prev => {
                const newLabels = [...prev.labels, new Date(data.timestamp).toLocaleTimeString()];
                const newData = [...(prev.datasets[0]?.data || []), stateToValue(stateToProcess)];

                if (newLabels.length > MAX_CHART_POINTS) {
                    newLabels.shift();
                    newData.shift();
                }

                return {
                    labels: newLabels,
                    datasets: [{
                        label: 'Cognitive State',
                        data: newData,
                        borderColor: '#00e5ff',
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        tension: 0.3,
                        fill: true,
                    }],
                };
            });
        };

        ws.onclose = () => console.log('WebSocket Disconnected');
        ws.onerror = (err) => console.error('WebSocket Error:', err);

        return () => ws.close();
    }, [debugState]);

    const fetchMnemonic = async (topic: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/generate-mnemonic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setMnemonic(data.mnemonic);
        } catch (error) {
            console.error("Failed to fetch mnemonic:", error);
            setMnemonic("Could not generate a helpful tip right now. Try to refocus!");
        }
    };

    useEffect(() => {
        // Reset interventions if state becomes non-distracted
        if (effectiveStatus === 'focused' || effectiveStatus === 'neutral') {
            setInterventionActive(false);
            setIsPulsing(false);
            setShowToast(false);
            setDrowsyIntervention(false);
            setDistractionCount(0);
            setShowEmojiRain(false);
            window.speechSynthesis.cancel(); // Stop any voice prompts
            return;
        }

        // Drowsy is a severe state, triggers immediate full overlay and voice
        if (effectiveStatus === 'drowsy') {
            speak("You seem a little drowsy. Let's take a quick mental break.");
            setDrowsyIntervention(true);
            // Clear other states
            setIsPulsing(false);
            setShowToast(false);
            setInterventionActive(false);
            return;
        }

        // Distraction escalation logic
        if (effectiveStatus === 'distracted') {
            // distractionCount === 1 is just the header change, no intervention
            if (distractionCount === 2) {
                // Ambient Pulse
                setIsPulsing(true);
            } else if (distractionCount === 3) {
                // Gentle Voice Nudge
                speak("I notice your focus is drifting. Let's recenter.");
                setShowEmojiRain(true);
                // Keep pulsing
            } else if (distractionCount === 4) {
                // Toast Notification
                fetchMnemonic(location.state?.lessonTitle || "the current topic");
                setShowToast(true);
            } else if (distractionCount >= 5) {
                // Full-Screen Mnemonic Overlay
                setShowToast(false); // Hide toast if it was shown
                setInterventionActive(true); 
                setShowEmojiRain(true);
            }
        }

    }, [distractionCount, effectiveStatus, location.state]);


    const handleGameCompletion = () => {
        setDrowsyIntervention(false);
        // Optionally, force the state to 'focused' for a short period
        const wasAuto = debugState === 'auto';
        setDebugState('focused');
        if (wasAuto) {
            setTimeout(() => setDebugState('auto'), 3000); // Return to normal monitoring after 3s
        }
    };

    const handleCloseIntervention = () => {
        setInterventionActive(false);
        setDrowsyIntervention(false);
        setDistractionCount(0);
        setMnemonic(null);
        // Force state to focused to clear interventions like emoji rain
        const wasAuto = debugState === 'auto';
        setDebugState('focused');
        if (wasAuto) {
            setTimeout(() => setDebugState('auto'), 1000); // Return to normal monitoring after 1s
        }
    };


    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
            ) : (
                <motion.div 
                    key="app"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="contents"
                >
                    <OnboardingModal onClose={() => {}} />
                    <div className={`flex h-screen bg-dark-bg text-text-light font-sans transition-all duration-500`}>
                        <Sidebar />
                        <div className="flex-1 flex flex-col overflow-hidden relative">
                            <NeuroStatusHeader 
                                title={pageTitle} 
                                status={effectiveStatus} 
                                rawEEGData={rawEEGData} 
                                isPulsing={isPulsing}
                            >
                                <DebugStateSelector onStateChange={setDebugState} currentState={debugState} />
                            </NeuroStatusHeader>
                            <main className="flex-1 overflow-y-auto p-6 bg-dark-bg pt-24">
                                <Routes>
                                    <Route path="/" element={<DashboardPage chartData={chartData} rawEEGData={rawEEGData} status={effectiveStatus} distractionCount={distractionCount} />} />
                                    <Route path="/courses" element={<CoursesPage />} />
                                    <Route path="/courses/:courseId" element={<CourseDetailPage />} />
                                    <Route path="/courses/:courseId/lessons/:lessonId" element={<DashboardPage chartData={chartData} rawEEGData={rawEEGData} status={effectiveStatus} distractionCount={distractionCount} />} />
                                    <Route path="/progress" element={<ProgressPage />} />
                                    <Route path="/settings" element={<SettingsPage />} />
                                </Routes>
                            </main>
                        </div>
                    </div>
                    <DrowsyIntervention 
                        isDrowsy={drowsyIntervention} 
                        onClose={handleCloseIntervention} 
                        onGameComplete={handleGameCompletion}
                    />
                    <EmojiRain isActive={showEmojiRain} />
                    {interventionActive && mnemonic && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
                            <div className="bg-dark-panel p-8 rounded-lg shadow-glow-red max-w-lg text-center border border-dark-border">
                                <h2 className="text-2xl font-bold text-accent-red mb-4">Stay Focused!</h2>
                                <p className="text-lg text-text-light">{mnemonic}</p>
                                <button 
                                    onClick={handleCloseIntervention}
                                    className="mt-6 bg-accent-red text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Back to Lesson
                                </button>
                            </div>
                        </div>
                    )}
                    <NotificationToast
                        title="A friendly reminder"
                        message={mnemonic || "Let's get back on track."}
                        show={showToast}
                        onClose={() => {
                            setShowToast(false);
                            // Do not reset mnemonic here, so it's available for the full overlay if needed
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
