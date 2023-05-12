import React from "react";
import "../styles/TrendingCoins.css";

const TrendingCoins = ({ coin }) => {
  return (
    <div className="coin-card">
      <img className="coin-image" src={coin.item.large} alt={coin.item.name} />

      <p className="coin-symbol-trend">{coin.item.symbol.toUpperCase()}</p>
      <p className="coin-price">฿{coin.item.price_btc.toFixed(7)}</p>
    </div>
  );
};

export default TrendingCoins;
