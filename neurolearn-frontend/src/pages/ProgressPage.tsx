import { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const doughnutData = {
  labels: ['Focused', 'Neutral', 'Distracted', 'Drowsy'],
  datasets: [
    {
      label: '% of Time',
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(57, 255, 20, 0.6)',
        'rgba(160, 174, 192, 0.6)',
        'rgba(248, 248, 47, 0.6)',
        'rgba(0, 191, 255, 0.6)',
      ],
      borderColor: [
        '#39ff14',
        '#a0aec0',
        '#f8f82f',
        '#00bfff',
      ],
      borderWidth: 1,
    },
  ],
};

const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Minutes Spent Learning',
            data: [30, 45, 60, 50, 75, 20, 90],
            backgroundColor: 'rgba(138, 43, 226, 0.6)',
            borderColor: '#8a2be2',
            borderWidth: 1,
        }
    ]
}

const ProgressPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-text-primary flex items-center">
        <TrendingUp className="w-8 h-8 mr-3 text-accent-cyan" />
        My Progress & Analytics
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-panel border border-dark-border rounded-lg p-4">
            <h2 className="text-xl font-bold text-center text-text-primary mb-4">Cognitive State Breakdown (Last 7 Days)</h2>
            <div className="h-80">
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: '#a0aec0' } } } }} />
            </div>
        </div>
        <div className="bg-dark-panel border border-dark-border rounded-lg p-4">
            <h2 className="text-xl font-bold text-center text-text-primary mb-4">Time Spent Learning (Last 7 Days)</h2>
            <div className="h-80">
                <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { ticks: { color: '#a0aec0' } }, x: { ticks: { color: '#a0aec0' } } } }} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
