import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const STOCKS = ['INTC', 'BIDU', 'FVRR', 'ABEV', 'LCID', 'LYFT', 'CNC', 'SNAP','JBLU','TSLA', 'RIVN', 'LUMN','LI','BABA','MO','MU','V'];
const API_KEY = 'd26oaspr01qvrairdbo0d26oaspr01qvrairdbog'; // Replace with your real API key

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const results = await Promise.all(
        STOCKS.map(async (symbol) => {
          const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
          return {
            symbol,
            current: res.data.c,
            change: res.data.d,
            percent: res.data.dp
          };
        })
      );
      setData(results);
    } catch (error) {
      console.error('Failed to fetch stock data', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid">
      {data.map((stock) => (
        <div key={stock.symbol} className="card">
          <h2>{stock.symbol}</h2>
          <p>${stock.current?.toFixed(2)}</p>
          <p className={stock.change >= 0 ? 'up' : 'down'}>
            {stock.change >= 0 ? '+' : ''}{stock.percent?.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
