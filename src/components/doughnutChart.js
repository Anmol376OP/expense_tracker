import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const data = {
        labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
        datasets: [
            {
                data: [120, 70, 60, 210], // Values for the doughnut chart
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#7F12B3"], // Colors for segments
            },
        ],
    };

    const options = {
        cutout: '85%',
        radius: 50,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            }
        },
        borderColor: 'transparent'
    };


    return (
        <div className="w-full h-full flex items-center justify-center">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
