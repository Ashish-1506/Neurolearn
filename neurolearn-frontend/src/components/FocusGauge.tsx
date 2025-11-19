import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CognitiveState } from '../types';
import { motion } from 'framer-motion';

interface FocusGaugeProps {
  status: CognitiveState;
}

const statusMap = {
  focused: { value: 90, color: '#10B981', text: 'Excellent' },
  neutral: { value: 60, color: '#3B82F6', text: 'Good' },
  distracted: { value: 30, color: '#F59E0B', text: 'Wavering' },
  drowsy: { value: 10, color: '#EF4444', text: 'Low' },
  analyzing: { value: 0, color: '#9CA3AF', text: 'Analyzing...' },
};

const FocusGauge = ({ status }: FocusGaugeProps) => {
  const { value, color, text } = statusMap[status] || statusMap.neutral;

  return (
    <div className="bg-dark-bg p-4 rounded-lg flex flex-col items-center justify-center border border-dark-border h-full">
      <h3 className="text-lg font-semibold text-text-light mb-4">Focus Level</h3>
      <div style={{ width: '150px', height: '150px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgressbar
            value={value}
            text={text}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: 'round',
              pathTransitionDuration: 0.8,
              pathColor: color,
              textColor: '#E5E7EB',
              trailColor: '#2D2D2D',
              backgroundColor: '#1E1E1E',
            })}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FocusGauge;
