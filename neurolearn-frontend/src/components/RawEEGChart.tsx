import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

interface RawEEGChartProps {
    data: number[];
}

const RawEEGChart = ({ data }: RawEEGChartProps) => {
    const chartData = {
        labels: data.map((_, i) => i + 1),
        datasets: [
            {
                data: data,
                borderColor: '#8a2be2',
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        animation: {
            duration: 200,
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                min: 0,
                max: 1,
            },
        },
    };

    return <Line options={options} data={chartData} />;
};

export default RawEEGChart;
