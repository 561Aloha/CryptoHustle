import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  console.log("Received Props in CoinInfo:", { image, name, symbol });

  // ✅ Prevents accidental early returns causing React hook errors
  if (!symbol) {
    console.warn("CoinInfo received undefined symbol. Waiting for data...");
    return <div>Loading...</div>;
  }

  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        console.log(`Fetching price for ${symbol}...`);
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const json = await response.json();
        console.log("API Response:", json);

        if (json.USD) {
          setPrice(json.USD);
        } else {
          console.warn(`No price found for ${symbol}`);
          setPrice(null);
        }
      } catch (error) {
        console.error("Failed to fetch price:", error);
        setPrice(null);
      }
    };

    getCoinPrice();
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={image ? `https://www.cryptocompare.com${image}` : "https://via.placeholder.com/40"}
            alt={`Small icon for ${name || symbol} crypto coin`}
          />
          <Link to={`/coinDetails/${symbol}`}>
            {name} <span className="tab"></span> ${price} USD
          </Link>
        </li>
      ) : (
        <p>Loading price for {symbol}...</p>
      )}
    </div>
  );
};

export default CoinInfo;
