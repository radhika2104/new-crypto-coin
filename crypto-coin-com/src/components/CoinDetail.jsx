import React from "react";
import "../styles/Home.css";
const CoinDetail = ({ currencySymbol, coin }) => {
  return (
    <div className="coin-row">
      <p className="market-cap-rank">{coin.market_cap_rank}</p>
      <div className="coin-img-name">
        <img src={coin.image} alt={coin.name}></img>
        <p>{coin.name}</p>
        <p className="coin-symbol">{coin.symbol?.toUpperCase()}</p>
      </div>
      <p>
        {currencySymbol}
        {coin.current_price?.toLocaleString()}
      </p>
      <p className="hide-mobile">
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </p>
      <p className="hide-mobile small-font">
        {currencySymbol}
        {coin.total_volume?.toLocaleString()}
      </p>
      <p className="hide-mobile small-font">
        {currencySymbol}
        {coin.market_cap?.toLocaleString()}
      </p>
    </div>
  );
};

export default CoinDetail;
