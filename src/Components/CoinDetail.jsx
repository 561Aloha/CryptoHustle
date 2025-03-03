import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Coin.css';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const detailsResponse = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}` );
        const descriptionResponse = await fetch( `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}` );
        if (!detailsResponse.ok || !descriptionResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const detailsJson = await detailsResponse.json();
        const descriptionJson = await descriptionResponse.json();
        setFullDetails({
          numbers: detailsJson.DISPLAY,
          textData: descriptionJson.Data
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setFullDetails(null);
      }
    };

    getCoinDetail();
  }, [symbol]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fullDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{fullDetails.textData[symbol].FullName}</h1>
      <img className="images"
        src={`https://www.cryptocompare.com${
          fullDetails.numbers[symbol]?.USD?.IMAGEURL || "" }`}
        alt={`Small icon for ${symbol} crypto coin`} />
      <div className="descript">{fullDetails.textData[symbol].Description}</div>
      <br />
      <div>
        This coin was built with the algorithm{" "}
        {fullDetails.textData[symbol].Algorithm}{" "}
      </div>
      <table>
        <tbody>
          <tr>
            <th>Launch Date</th>
            <td>{fullDetails.textData[symbol].AssetLaunchDate}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href={fullDetails.textData[symbol].AssetWebsiteUrl}>
                {fullDetails.textData[symbol].AssetWebsiteUrl}
              </a>
            </td>
          </tr>
          <tr>
            <th>Whitepaper</th>
            <td>{fullDetails.textData[symbol].AssetWhitePaperUrl}</td>
          </tr>
          <tr>
            <th>MarketCap</th>
            <td>{fullDetails.numbers[symbol]?.USD?.MKTCAP}</td>
          </tr>
          <tr>
            <th>Monetary Symbol</th>
            <td>{fullDetails.numbers[symbol]?.USD?.FROMSYMBOL}</td>
          </tr>
          <tr>
            <th>Percentage Change in MarketCap</th>
            <td>{fullDetails.numbers[symbol]?.USD?.ChangePCTDAP}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinDetail;
