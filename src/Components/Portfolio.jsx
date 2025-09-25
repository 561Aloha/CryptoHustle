import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHolding, setNewHolding] = useState({
    symbol: '',
    quantity: '',
    purchasePrice: ''
  });

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    } else {
      // Add placeholder data for demonstration
      const placeholderData = [
        {
          id: 1,
          symbol: 'BTC',
          quantity: 0.5,
          purchasePrice: 45000,
          dateAdded: '01/15/2024'
        },
        {
          id: 2,
          symbol: 'ETH',
          quantity: 2.5,
          purchasePrice: 2800,
          dateAdded: '02/20/2024'
        },
        {
          id: 3,
          symbol: 'ADA',
          quantity: 1000,
          purchasePrice: 0.48,
          dateAdded: '03/10/2024'
        }
      ];
      setPortfolio(placeholderData);
    }
  }, []);

  // Fetch current prices for all portfolio coins
  useEffect(() => {
    if (portfolio.length > 0) {
      fetchCurrentPrices();
    }
  }, [portfolio]);

  const fetchCurrentPrices = async () => {
    try {
      const symbols = portfolio.map(coin => coin.symbol).join(',');
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD&api_key=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.RAW) {
        const prices = {};
        Object.keys(data.RAW).forEach(symbol => {
          prices[symbol] = data.RAW[symbol].USD.PRICE;
        });
        setCurrentPrices(prices);
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const savePortfolio = (updatedPortfolio) => {
    setPortfolio(updatedPortfolio);
    localStorage.setItem('cryptoPortfolio', JSON.stringify(updatedPortfolio));
  };

  const addHolding = () => {
    if (newHolding.symbol && newHolding.quantity && newHolding.purchasePrice) {
      const holding = {
        id: Date.now(),
        symbol: newHolding.symbol.toUpperCase(),
        quantity: parseFloat(newHolding.quantity),
        purchasePrice: parseFloat(newHolding.purchasePrice),
        dateAdded: new Date().toLocaleDateString()
      };

      savePortfolio([...portfolio, holding]);
      setNewHolding({ symbol: '', quantity: '', purchasePrice: '' });
      setShowAddForm(false);
    }
  };

  const removeHolding = (id) => {
    const updatedPortfolio = portfolio.filter(holding => holding.id !== id);
    savePortfolio(updatedPortfolio);
  };

  const calculateHoldingMetrics = (holding) => {
    const currentPrice = currentPrices[holding.symbol] || 0;
    const initialValue = holding.quantity * holding.purchasePrice;
    const currentValue = holding.quantity * currentPrice;
    const profitLoss = currentValue - initialValue;
    const profitLossPercent = initialValue > 0 ? (profitLoss / initialValue) * 100 : 0;

    return {
      currentPrice,
      initialValue,
      currentValue,
      profitLoss,
      profitLossPercent
    };
  };

  const calculateTotalMetrics = () => {
    let totalInitialValue = 0;
    let totalCurrentValue = 0;

    portfolio.forEach(holding => {
      const metrics = calculateHoldingMetrics(holding);
      totalInitialValue += metrics.initialValue;
      totalCurrentValue += metrics.currentValue;
    });

    const totalProfitLoss = totalCurrentValue - totalInitialValue;
    const totalProfitLossPercent = totalInitialValue > 0 ? (totalProfitLoss / totalInitialValue) * 100 : 0;

    return {
      totalInitialValue,
      totalCurrentValue,
      totalProfitLoss,
      totalProfitLossPercent
    };
  };

  const totalMetrics = calculateTotalMetrics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Your Crypto Portfolio</h2>
        <button 
          className="add-holding-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Holding'}
        </button>
      </div>

      {/* Portfolio Summary */}
      {portfolio.length > 0 && (
        <div className="portfolio-summary">
          <div className="summary-card">
            <h3>Portfolio Value</h3>
            <div className="portfolio-value">
              {formatCurrency(totalMetrics.totalCurrentValue)}
            </div>
            <div className="portfolio-initial">
              Initial: {formatCurrency(totalMetrics.totalInitialValue)}
            </div>
          </div>
          <div className="summary-card">
            <h3>Total P&L</h3>
            <div className={`profit-loss ${totalMetrics.totalProfitLoss >= 0 ? 'profit' : 'loss'}`}>
              {formatCurrency(totalMetrics.totalProfitLoss)}
            </div>
            <div className={`profit-loss-percent ${totalMetrics.totalProfitLoss >= 0 ? 'profit' : 'loss'}`}>
              {formatPercent(totalMetrics.totalProfitLossPercent)}
            </div>
          </div>
        </div>
      )}

      {/* Add Holding Form */}
      {showAddForm && (
        <div className="add-holding-form">
          <h3>Add New Holding</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Symbol (e.g., BTC)"
              value={newHolding.symbol}
              onChange={(e) => setNewHolding({...newHolding, symbol: e.target.value})}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newHolding.quantity}
              onChange={(e) => setNewHolding({...newHolding, quantity: e.target.value})}
            />
            <input
              type="number"
              placeholder="Purchase Price (USD)"
              value={newHolding.purchasePrice}
              onChange={(e) => setNewHolding({...newHolding, purchasePrice: e.target.value})}
            />
          </div>
          <button className="save-holding-btn" onClick={addHolding}>
            Add to Portfolio
          </button>
        </div>
      )}

      {/* Portfolio Holdings */}
      {portfolio.length === 0 ? (
        <div className="empty-portfolio">
          <p>Loading portfolio data...</p>
        </div>
      ) : (
        <div className="holdings-list">
          <div className="holdings-header">
            <div>Crypto</div>
            <div>Quantity</div>
            <div>Avg Price</div>
            <div>Current Price</div>
            <div>Value</div>
            <div>P&L</div>
            <div>Actions</div>
          </div>
          
          {portfolio.map(holding => {
            const metrics = calculateHoldingMetrics(holding);
            return (
              <div key={holding.id} className="holding-row">
                <div className="crypto-info">
                  <strong>{holding.symbol}</strong>
                  <small>{holding.dateAdded}</small>
                </div>
                <div>{holding.quantity}</div>
                <div>{formatCurrency(holding.purchasePrice)}</div>
                <div>{formatCurrency(metrics.currentPrice)}</div>
                <div>{formatCurrency(metrics.currentValue)}</div>
                <div className={`profit-loss ${metrics.profitLoss >= 0 ? 'profit' : 'loss'}`}>
                  {formatCurrency(metrics.profitLoss)}
                  <small>{formatPercent(metrics.profitLossPercent)}</small>
                </div>
                <div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeHolding(holding.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;