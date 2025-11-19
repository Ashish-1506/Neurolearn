import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SessionBreakdownChart = () => {
  const data = {
    labels: ['Focused', 'Neutral', 'Distracted', 'Drowsy'],
    datasets: [
      {
        label: 'Time in State (%)',
        data: [45, 25, 20, 10], // Mock data
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1E1E1E',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
      },
    },
    cutout: '70%',
  };

  return (
    <div className="bg-dark-bg p-4 rounded-lg border border-dark-border h-full">
      <h3 className="text-lg font-semibold text-text-light mb-4 text-center">Session Breakdown</h3>
      <div className="relative h-52">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SessionBreakdownChart;
