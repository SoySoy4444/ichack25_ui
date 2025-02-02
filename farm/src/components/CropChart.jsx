import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const CropChart = (cropData) => {
  const chartData = {
    labels: cropData.data.map((crop) => crop.title),
    datasets: [
      {
        label: 'Crop Proportion',
        data: cropData.data.map((crop) => crop.proportion),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default CropChart;
