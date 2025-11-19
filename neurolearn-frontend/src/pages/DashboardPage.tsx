import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CognitiveState, ChartData, RawEEGData } from '../types';
import { useLocation, Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardPanel from '../components/DashboardPanel';
import LessonProgressBar from '../components/LessonProgressBar';
import LessonNavigation from '../components/LessonNavigation';
import KeyConcept from '../components/KeyConcept';
import CodeBlock from '../components/CodeBlock';
import { courseData } from '../data/courses';

interface DashboardPageProps {
    chartData: ChartData;
    rawEEGData: RawEEGData;
    status: CognitiveState;
    distractionCount: number;
}

const WelcomePanel = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div className="relative overflow-hidden rounded-lg h-full bg-dark-panel border border-dark-border">
            <img
                src="/hero-background.png"
                alt="A student focusing at a futuristic desk with holographic displays"
                className="absolute inset-0 w-full h-full object-contain z-0"
            />
            <div className="absolute inset-0 z-10 bg-dark-bg/70"></div>
            
            <motion.div
                className="relative z-20 h-full flex flex-col justify-center items-start p-6 sm:p-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
                    variants={itemVariants}
                >
                    Welcome to the Learning Cockpit
                </motion.h1>
                <motion.p
                    className="text-md sm:text-lg text-text-secondary max-w-xl mb-8"
                    variants={itemVariants}
                >
                    Select a lesson from the Course Library to begin your personalized learning journey.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Link
                        to="/courses"
                        className="px-6 py-3 font-semibold text-white bg-accent-blue rounded-lg shadow-lg hover:bg-accent-blue-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-opacity-50"
                    >
                        Get Started
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

const DashboardPage = ({ chartData, status, distractionCount }: DashboardPageProps) => {
    const location = useLocation();
    const { courseId: paramCourseId, lessonId: paramLessonId } = useParams();
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    // Resolve lesson details from state or URL params
    let { lessonTitle, lessonId } = location.state || {};

    if (!lessonTitle && paramCourseId && paramLessonId) {
        const course = courseData[paramCourseId];
        const lesson = course?.lessons.find(l => l.id === paramLessonId);
        if (lesson) {
            lessonTitle = lesson.title;
            lessonId = lesson.id;
        }
    }

    const isLessonActive = !!lessonTitle;

    const mainContentSpan = () => {
        if (!isLessonActive) {
            return 'lg:col-span-3'; // Welcome screen
        }
        return isPanelOpen ? 'lg:col-span-3' : 'lg:col-span-5'; // Lesson view
    };

    return (
        <div className="h-full relative">
            {isLessonActive && (
                <button 
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="absolute top-1/2 -translate-y-1/2 bg-dark-panel border border-dark-border rounded-full p-1 z-20 transition-transform duration-300 hover:bg-accent-blue"
                    style={{ right: isPanelOpen ? 'calc(40% - 12px)' : '-12px' }}
                >
                    {isPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                <div 
                    className={`h-full ${mainContentSpan()} transition-all duration-500 ease-in-out`}
                >
                    {isLessonActive ? (
                        <div className="bg-dark-panel rounded-lg p-6 border border-dark-border overflow-y-auto flex flex-col h-full">
                            <div className="flex-grow flex flex-col">
                                <LessonProgressBar progress={25} />
                                <h2 className="text-3xl font-bold text-text-light mt-4 mb-6">{lessonTitle}</h2>
                                
                                <div className="prose prose-invert max-w-none text-text-muted leading-relaxed space-y-6 flex-grow">
                                    <p>
                                        Neurotransmitters are chemical messengers that transmit signals across a chemical synapse, from one neuron (nerve cell) to another 'target' neuron, muscle cell, or gland cell. Dopamine is a particularly important one, involved in reward, motivation, and motor control.
                                    </p>
                                    
                                    <KeyConcept title="The Dopamine Pathway">
                                        Dopamine is synthesized in the brain from the amino acid L-DOPA. Its chemical structure is crucial for its function.
                                    </KeyConcept>

                                    <CodeBlock language="chemical">
                                        C₈H₁₁NO₂ (Dopamine)
                                    </CodeBlock>

                                    <p>
                                        Understanding how dopamine levels affect focus is key to our work. When you are focused, dopamine levels in the prefrontal cortex are typically well-regulated. Distractions can cause fluctuations, leading to a drop in concentration.
                                    </p>
                                </div>

                                <LessonNavigation currentLessonId={lessonId} />
                            </div>
                        </div>
                    ) : (
                        <WelcomePanel />
                    )}
                </div>

                <AnimatePresence>
                    {(isPanelOpen || !isLessonActive) && (
                        <motion.div 
                            className="h-full lg:col-span-2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <DashboardPanel status={status} distractionCount={distractionCount} chartData={chartData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DashboardPage;

