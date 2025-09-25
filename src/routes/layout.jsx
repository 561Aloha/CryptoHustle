import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import './layout.css';

const Layout = () => {
  return (
    
    <div className="adiv">
      <div className="blob-container-2">
          <div className="blobs-2">
            <div className="blob a"></div>
            <div className="blob b"></div>
            <div className="blob c"></div>
          </div>
        </div>


        <nav>
        <ul>
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/topcryptos">Top Cryptos</NavLink>
          </li>
          <li>
            <NavLink to="/all">All Cryptos</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio">Portfolio</NavLink>
          </li>

        </ul>
      </nav>

      {/* This will render the current route inside Layout */}
      <Outlet />
      <div className="blob-container">
        <div className="blobs">
          <div className="blob a"></div>
          <div className="blob b"></div>
          <div className="blob c"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
