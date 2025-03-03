import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import '.extra.css';

const CryptoPriceChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30&api_key=${API_KEY}`
      );

      const data = response.data.Data.Data;
      const prices = data.map((item) => item.close);
      const timestamps = data.map((item) =>
        new Date(item.time * 1000).toLocaleDateString()
      );

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: "BTC Price (USD)",
            data: prices,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CryptoPriceChart;
