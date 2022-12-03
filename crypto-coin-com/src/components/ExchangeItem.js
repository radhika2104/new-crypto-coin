// import React from 'react'

// const ExchangeItem = () => {
//   return (
//     <div>ExchangeItem</div>
//   )
// }

// export default ExchangeItem

import React from "react";
import "../styles/Exchanges.css";
const ExchangeItem = ({ exchange }) => {
  return (
    <div className="exchange-row">
      <p className="market-cap-rank small-font">{exchange.trust_score_rank}</p>
      <div className="exchange-img-name small-font">
        <img src={exchange.image} alt={exchange.name}></img>
        <p>{exchange.name}</p>
      </div>
      <p className="small-font">{exchange.trust_score}</p>
      <p className="hide-mobile">{exchange.trade_volume_24h_btc.toFixed(2)}</p>
      <p className="hide-mobile">{exchange.year_established}</p>
    </div>
  );
};

export default ExchangeItem;
