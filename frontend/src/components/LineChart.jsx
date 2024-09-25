import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      titleFont: {
        size: 16, // Font size of the tooltip title
        weight: "bold", // Font weight of the tooltip title
      },
      bodyFont: {
        size: 14, // Font size of the tooltip body
      },
    },
    legend: {
      position: "top",
      labels: {
        font: {
          size: 20, // Adjust the font size of the legend text
          weight: "bold", // Make the legend text bold
        },
      },
    },
    title: {
      display: true,
      text: "Predicted Stock Prices",
      font: {
        size: 24, // Adjust the font size of the title
        weight: "bold", // Make the title bold
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "black", // Color of the x-axis labels
        font: {
          weight: "bold", // Bold font for the x-axis labels
        },
      },
    },
    y: {
      ticks: {
        color: "black", // Color of the y-axis labels
        font: {
          weight: "bold", // Bold font for the y-axis labels
        },
      },
    },
  },
};
function LineChart({ data }) {
  const lineChartData = {
    labels: data.dateList,
    datasets: [
      {
        label: "Predicted Price",
        data: data.priceList,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full md:w-2/5">
      <Line options={options} data={lineChartData} />
    </div>
  );
}

export default LineChart;
