import { motion } from 'framer-motion';
import { CognitiveState } from '../types';
import SessionStats from './SessionStats';
import FocusGauge from './FocusGauge';
import SessionBreakdownChart from './SessionBreakdownChart';
import EEGChart from './EEGChart';
import { ChartData } from '../types';

interface DashboardPanelProps {
  status: CognitiveState;
  distractionCount: number;
  chartData: ChartData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const getGlowClass = (status: CognitiveState) => {
  switch (status) {
    case 'focused':
      return 'shadow-glow-green';
    case 'neutral':
      return 'shadow-glow-blue';
    case 'distracted':
      return 'shadow-glow-yellow';
    case 'drowsy':
      return 'shadow-glow-red';
    default:
      return 'shadow-glow-blue';
  }
};

const DashboardPanel = ({ status, distractionCount, chartData }: DashboardPanelProps) => {
  // Mock data for now
  const sessionTime = "14:32";
  const tipsReceived = distractionCount > 2 ? 1 : 0;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full h-full bg-dark-panel rounded-lg p-6 space-y-6 border border-dark-border transition-all duration-500 ${getGlowClass(status)}`}
    >
      <motion.div variants={itemVariants}>
        <SessionStats sessionTime={sessionTime} distractions={distractionCount} tipsReceived={tipsReceived} />
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FocusGauge status={status} />
        <SessionBreakdownChart />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-text-light mb-4">Real-time Cognitive State</h3>
        <div className="h-64">
          <EEGChart data={chartData} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPanel;
