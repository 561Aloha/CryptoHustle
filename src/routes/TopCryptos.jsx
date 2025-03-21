import React, { useState, useEffect } from "react";
import axios from "axios";
import './extra.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const TopCryptos = () => {
  const formatNumber = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    });
    return formatter.format(num);
  };
  
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopCryptos = async () => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${API_KEY}`
      );
      console.log(response.data); // Log the API response

      const data = response.data.Data.map((crypto) => ({
        name: crypto.CoinInfo.FullName,
        symbol: crypto.CoinInfo.Name,
        price: crypto.RAW?.USD?.PRICE ? crypto.RAW.USD.PRICE.toFixed(2) : "N/A",
        marketCap: crypto.RAW?.USD?.MKTCAP ? crypto.RAW.USD.MKTCAP : 0,
      }));

      setCryptos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCryptos();
  }, []);

  return (
    <div className="crypto-container">

<h2>Here is a list of trending crypto currencies</h2>   
      <div className="row">
        <h3 className="crypto_name">Crypto Name</h3>
        <h3 className="crypto_price">Price</h3>
        <h3 className="crypto_market">Market Cap</h3>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="crypto-list">
          {cryptos.map((crypto, index) => (
            <li key={index} className="crypto-item">
              <div className="crypto-info">
                <h5>({crypto.symbol})</h5>
                <h3>{crypto.name}</h3>
              </div>
              <h3 className="crypto-price">${crypto.price}</h3>
              <h3 className="crypto-market-cap">${formatNumber(crypto.marketCap)}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopCryptos;
