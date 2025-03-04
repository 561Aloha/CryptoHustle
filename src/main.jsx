import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './routes/layout';
import DetailView from './routes/DetailView';

import CoinInfo from "./Components/CoinInfo.jsx";
import TopCryptos from "./routes/TopCryptos.jsx";
import CryptoLineChart from "./routes/CryptoLineChart.jsx";
import FAQ from "./routes/FAQ.jsx";
import App from "./App.jsx"; // Import App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home Route Uses App.jsx Now */}
          <Route index element={<App />} />

          {/* Other Routes */}
          <Route path="/topcryptos" element={<TopCryptos />} />
          <Route path="/all" element={<CoinInfo/>} />
          <Route path="/stats" element={<CryptoLineChart />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/coinDetails/:symbol" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
