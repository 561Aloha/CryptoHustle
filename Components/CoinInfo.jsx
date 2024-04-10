import { useEffect, useState } from 'react';
import './Coin.css'
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol}) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getCoinPrice = async () => {
      const URL = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
      try{
        const response = await fetch (URL);
        const data = await response.json();
        setPrice(data);
      } catch (error){
        if (error.name === 'AbortError'){
          //nothing do nothing
        }else{
          console.error(error);
        }
      }
    };
  
    getCoinPrice().catch(console.error);
    return () => controller.abort();
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          
          <Link
            style={{ color: "White" }}
            to={`/coinDetails/${symbol}`}
            key={symbol}
          >
          {name} &lt;<span className="tab"></span>  ${price.USD} USD
          </Link>
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;
