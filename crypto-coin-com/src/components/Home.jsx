import React from "react";
import CoinDetail from "./CoinDetail";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Coin from "./Coin";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({ coins, currencySymbol, handleCurrencyChange }) => {
  const [inputVal, setInputVal] = useState("");
  const [dropdownfields, setDropdownfields] = useState([]);
  const [visibleDropDown, setvisibleDropDown] = useState(false);
  console.log("dropdownfields:", dropdownfields);

  // const handleDropDownSuggestion = (eventTargetValue) => {
  //   setInputVal(eventTargetValue)
  //   const url = `https://api.coingecko.com/api/v3/search?query=${eventTargetValue}`;

  //   useEffect(() => {
  //     axios
  //       .get(url)
  //       .then((response) => console.log(response.data))
  //       .catch((error) => console.log(error));

  //   }, []);
  // };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/search?query=${inputVal}&per_page=10&page=1`
      )
      .then((response) => {
        console.log(response.data);
        setDropdownfields(response.data);
        console.log("dropdownfields:", dropdownfields);
      })
      .catch((error) => console.log(error));
  }, [inputVal]);

  function stringThisText(inputstr) {
    let stringArray = inputstr.split(" ");
    return stringArray.join(" ");
  }

  useEffect(() => {});
  function hideDropDownDisplay() {}

  function showDropDownDisplay() {}
  return (
    <div className="container">
      <div className="sub-nav">
        <h2 className="cyptocurrency-heading">
          Cryptocurrency Prices by Market Cap
        </h2>

        <ul className="currency-search-btns">
          <li>
            <select
              onChange={(event) => handleCurrencyChange(event.target.value)}
            >
              <option value="inr">Currency:</option>
              <option value="inr">INR</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="aed">AED</option>
              <option value="btc">BTC</option>
            </select>
          </li>
          <li>
            <input
              placeholder="🔍 Search Coin"
              type="search"
              value={inputVal}
              onChange={(event) => setInputVal(event.target.value)}
              onClick={(event) => showDropDownDisplay(event.target.value)}
              onBlur={() => hideDropDownDisplay()}
            ></input>
            <div className="dropdown-container">
              {dropdownfields?.coins?.map((result) => {
                return (
                  <Link
                    to={`/coin/${result.id}`}
                    key={result.id}
                    element={<Coin currencySymbol={currencySymbol}></Coin>}
                  >
                    <div className="dropdown-left-right">
                      <div className="left-side">
                        <img
                          src={result.thumb}
                          className="drop-down-image"
                        ></img>
                        <span className="dropdown-coin-name">
                          {stringThisText(result.name)}
                        </span>
                        <span className="coin-symbol">
                          {result.symbol.toUpperCase()}
                        </span>
                      </div>
                      <div className="right-side">
                        # Rank{result.market_cap_rank}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </li>
        </ul>
      </div>

      <div>
        <div className="home-heading">
          <h3>#</h3>
          <h3 className="coin-name">Coin</h3>
          <h3>Price</h3>
          <h3 className="hide-mobile">24h %</h3>
          <h3 className="hide-mobile ">Volume</h3>
          <h3 className="hide-mobile ">Market Cap</h3>
        </div>
        {coins.map((coin) => {
          return (
            <Link
              to={`/coin/${coin.id}`}
              key={coin.id}
              element={<Coin currencySymbol={currencySymbol} />}
            >
              <CoinDetail
                coin={coin}
                currencySymbol={currencySymbol}
                key={coin.id}
              ></CoinDetail>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
