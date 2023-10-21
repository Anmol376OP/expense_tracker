import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = (props) => {
    // Sample data for five variables
    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [
            {
                label: 'Utility',
                data: props.data1,
                borderColor: '#6f27c2',
                fill: false,
            },
            {
                label: 'Healthcare',
                data: props.data2,
                borderColor: '#38e9fc',
                fill: false,
            },
            {
                label: 'Essentials',
                data: props.data3,
                borderColor: '#FFD700',
                fill: false,
            },
            {
                label: 'Entertainment',
                data: props.data4,
                borderColor: '#FF4136',
                fill: false,
            },
            {
                label: 'Miscellaneous',
                data: props.data5,
                borderColor: '#80fa1b',
                fill: false,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
            },
        },
        elements: {
            point: {
                radius: 1
            }
        }
    };
    return (
        <div className='w-full h-full'>
            <Line
                data={data}
                options={options}

            />
        </div>
    );
};

export default LineChart;
