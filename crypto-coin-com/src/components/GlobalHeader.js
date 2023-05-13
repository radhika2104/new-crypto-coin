import React from "react";
import "../styles/GlobalHeader.css";
import { useState, useEffect } from "react";
import axios from "axios";

const GlobalHeader = ({ currencySymbol, currency }) => {
  const globalAttributesUrl = "https://api.coingecko.com/api/v3/global";
  const [globalAttributes, setGlobalAttributes] = useState({});
  const [numCoins, setNumCoins] = useState(0);
  const [numExchanges, setNumExchanges] = useState(0);

  const [marketCap, setMarketCap] = useState(0);
  const [volume, setVolume] = useState(0);
  const [btcDominance, setBtcDominance] = useState(0);
  const [ethDominance, setEthDominance] = useState(0);

  useEffect(() => {
    axios
      .get(globalAttributesUrl)
      .then((response) => {
        console.log(response.data);
        setGlobalAttributes(response.data);
        setNumCoins(response.data.data?.active_cryptocurrencies);
        setNumExchanges(response.data.data?.markets);

        setMarketCap(
          response.data.data?.total_market_cap[currency]?.toLocaleString()
        );
        setVolume(response.data.data?.total_volume[currency]?.toLocaleString());
        setBtcDominance(
          response.data.data?.market_cap_percentage?.btc.toFixed(2)
        );
        setEthDominance(
          response.data.data?.market_cap_percentage?.eth.toFixed(2)
        );
      })
      .catch((error) => console.log(error));
  }, [globalAttributesUrl, currencySymbol, currency]);

  /* Coins: 10723
Exchanges: 739
Market Cap: $1,165,389,091,820 -3.3%
24h Vol: $53,769,375,855
Dominance:
BTC 45.0%
ETH 18.6% */
  return (
    <div className="global-header-container">
      <nav>
        <ul>
          <li>
            <span>Coins: </span>
            <span className="values">{numCoins}</span>
          </li>
          <li className="hide-mobile">
            <span>Exchanges: </span>
            <span className="values ">{numExchanges}</span>
          </li>
          <li className="global-header-li-sep">
            <span>
              Market Cap:{" "}
              <span className="values">
                {currencySymbol}
                {marketCap}
              </span>
            </span>

            <span className="market-cap-change">
              {globalAttributes.data?.market_cap_change_percentage_24h_usd > 0
                ? "▲"
                : "▼"}
              {globalAttributes.data?.market_cap_change_percentage_24h_usd > 0
                ? globalAttributes.data?.market_cap_change_percentage_24h_usd.toFixed(
                    2
                  )
                : -1 *
                  globalAttributes.data?.market_cap_change_percentage_24h_usd.toFixed(
                    2
                  )}
              %
            </span>
          </li>
          <li className="hide-mobile">
            <span>24h Vol: </span>
            <span className="values">
              {currencySymbol}
              {volume}
            </span>
          </li>
          <li className="hide-mobile global-header-li-sep">
            <span>Dominance: </span>
            <span>
              BTC: <span className="values">{btcDominance}%</span>
            </span>
            <span>
              ETH: <span className="values">{ethDominance}%</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GlobalHeader;
