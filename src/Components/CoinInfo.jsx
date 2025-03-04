import { useEffect, useState } from 'react';
import './Coin.css';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinList = () => {
  const [coins, setCoins] = useState([]); // Store active cryptocurrencies
  const [searchTerm, setSearchTerm] = useState(''); // Store user input

  useEffect(() => {
    const fetchCoins = async () => {
      const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=${API_KEY}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.Data) {
          // Extract relevant details for each coin
          const activeCoins = data.Data.map(coin => ({
            id: coin.CoinInfo.Id,
            symbol: coin.CoinInfo.Name,
            name: coin.CoinInfo.FullName,
            image: coin.CoinInfo.ImageUrl, // Image URL might need prefixing
          }));
          setCoins(activeCoins);
        }
      } catch (error) {
        console.error('Error fetching coin list:', error);
      }
    };

    fetchCoins();
  }, []);

  // Filter coins based on search term
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="coin-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display Coin List */}
      <ul className="coin-list">
        {filteredCoins.map((coin) => (
          <li className="main-list" key={coin.id}>
            <img
              className="icons"
              src={`https://www.cryptocompare.com${coin.image}`}
              alt={`Small icon for ${coin.name}`}
            />
            <div className="coin-info">
              <Link to={`/coinDetails/${coin.symbol}`} className="coin-link">
                {coin.name} ({coin.symbol})
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
