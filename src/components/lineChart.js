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
    Filler
} from 'chart.js';

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

const LineChart = (props) => {
    const n = props.n ? props.n : 1;
    const dataset = [
        {
            label: 'Utility',
            data: props.data1,
            borderColor: `${n === 1 ? 'transparent' : '#6f27c2'}`,
            fill: n === 1 ? { target: 'origin', above: 'rgba(0,250,42,0.2)', below: 'rgba(250,0,0,0.2)' } : false,
            cubicInterpolationMode: 'monotone'
        },
        {
            label: 'Healthcare',
            data: props.data2,
            borderColor: '#38e9fc',
            fill: false,
            cubicInterpolationMode: 'monotone'
        },
        {
            label: 'Essentials',
            data: props.data3,
            borderColor: '#FFD700',
            fill: false,
            cubicInterpolationMode: 'monotone'
        },
        {
            label: 'Entertainment',
            data: props.data4,
            borderColor: '#FF4136',
            fill: false,
            cubicInterpolationMode: 'monotone'
        },
        {
            label: 'Miscellaneous',
            data: props.data5,
            borderColor: '#80fa1b',
            fill: false,
            cubicInterpolationMode: 'monotone'
        }
    ]

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: dataset.slice(0, n),
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
            filler: {
                propagate: true,
            }
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
