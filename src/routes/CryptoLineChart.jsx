import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './extra.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CryptoLineChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('weekly'); // State to track the selected timeframe

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = timeframe === 'weekly' ? 7 : 30; // Set limit based on timeframe
        const response = await axios.get(
          'https://min-api.cryptocompare.com/data/v2/histoday',
          {
            params: {
              fsym: 'BTC',
              tsym: 'USD',
              limit, // Fetch data for the last 7 or 30 days
            },
          }
        );

        const data = response.data.Data.Data;

        // Format timestamps
        const timestamps = data.map((item) => new Date(item.time * 1000));

        // Extract prices
        const prices = data.map((item) => item.close);

        // Adjust labels based on timeframe
        const labels = timeframe === 'weekly'
          ? timestamps.map((date) =>
              new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
            ) // Sunday-Saturday for weekly
          : [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]; // Full months for monthly

        setChartData({
          labels,
          datasets: [
            {
              label: `Bitcoin Price (USD) - ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} View`,
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.3,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CryptoCompare data:', error);
      }
    };

    fetchData();
  }, [timeframe]); // Refetch data when the timeframe changes

  return (
    <div className='hello'>
      <div>
        <button onClick={() => setTimeframe('weekly')} disabled={timeframe === 'weekly'}>
          Weekly View
        </button>
        <button onClick={() => setTimeframe('monthly')} disabled={timeframe === 'monthly'}>
          Monthly View
        </button>
      </div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Bitcoin Price (Last ${timeframe === 'weekly' ? '7' : '30'} Days)`,
              },
            },
            scales: {
              x: {
                type: 'category', // Use category scale for custom labels
                ticks: {
                  callback: function (value, index) {
                    return chartData.labels[index]; // Show custom labels
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CryptoLineChart;
