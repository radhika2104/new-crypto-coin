import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ExchangeItem from "./ExchangeItem";
import "../styles/Exchanges.css";

const Exchanges = () => {
  const [exchange, setExchanges] = useState([]);
  const url = "https://api.coingecko.com/api/v3/exchanges";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setExchanges(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container">
      <h2 className="cyptocurrency-heading">
        Top Cryptocurrency Spot Exchanges
      </h2>
      <div className="heading">
        <h3>#</h3>
        <h3 className="coin-name">Exchange</h3>
        <h3>Score</h3>
        <h3 className="hide-mobile">BTC Trading Volume (24h)</h3>
        <h3 className="hide-mobile">Year Established</h3>
      </div>
      {exchange.map((obj) => {
        return <ExchangeItem key={obj.id} exchange={obj}></ExchangeItem>;
      })}
    </div>
  );
};

export default Exchanges;
