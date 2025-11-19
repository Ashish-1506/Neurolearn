import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from '../types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface EEGChartProps {
    data: ChartData;
}

const EEGChart = ({ data }: EEGChartProps) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Cognitive State History',
                color: '#edf2f7',
                font: {
                    size: 16,
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(45, 55, 72, 0.5)',
                },
                ticks: {
                    color: '#a0aec0',
                },
            },
            y: {
                grid: {
                    color: 'rgba(45, 55, 72, 0.5)',
                },
                ticks: {
                    color: '#a0aec0',
                    callback: function(value: string | number) {
                        switch(value) {
                            case 0: return 'Drowsy';
                            case 0.5: return '';
                            case 1: return 'Distracted';
                            case 1.5: return 'Neutral';
                            case 2: return 'Focused';
                            default: return '';
                        }
                    }
                },
                min: 0,
                max: 2.2,
            },
        },
    };

    return (
        <div className="h-full w-full p-4 bg-dark-panel rounded-lg border border-dark-border">
            <Line options={options} data={data} />
        </div>
    );
};

export default EEGChart;
