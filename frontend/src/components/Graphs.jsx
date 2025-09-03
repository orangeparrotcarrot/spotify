// src/components/Graphs.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graphs = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.daily_counts),
    datasets: [
      {
        label: 'Tracks Played Per Day',
        data: Object.values(data.daily_counts),
        backgroundColor: '#1DB954',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Listening Trends' },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>

  );
};

export default Graphs;
