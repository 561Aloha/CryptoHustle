import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
      <div className="whole-page">
       <div className="hustle-intro"><h4>Crypto Hustle</h4> 
       <h2>Discover The World of Crypto</h2> 
       <h3>This is the perfect place to learn about crypto currencies and start to understand some of the fundamental concepts behind the blockchain.
       <hr></hr>
       </h3><h4> This is a open-sourced project</h4>
       <div className="open-source">
        <Link to='https://github.com/561Aloha/CryptoHustle'><button>View Code</button></Link> 
        <Link to='https://madebydianna.com'> <button>Go to Creator</button></Link>
       </div>
       
       </div>


      </div>
  );
};

export default App;
