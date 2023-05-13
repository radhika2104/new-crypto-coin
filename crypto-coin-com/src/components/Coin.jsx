import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Coin.css";
import { useRef } from "react";
import ProgressBar from "./ProgressBar";
import CoinChart from "./CoinChart";
// import ReactReadMoreReadLess from "react-read-more-read-less";

const Coin = ({ currencySymbol, error }) => {
  const currencyReverseMap = {
    "₹": "inr",
    $: "usd",
    "د.إ": "aed",
    "€": "eur",
    "฿": "btc",
  };

  const daysBtns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  function changeDaysOnClick(btndata) {
    if (btndata === "24h") {
      setDays("24h");
    } else if (btndata === "7d") {
      setDays("7d");
    } else if (btndata === "14d") {
      setDays("14d");
    } else if (btndata === "30d") {
      setDays("30d");
    } else if (btndata === "60d") {
      setDays("60d");
    } else if (btndata === "200d") {
      setDays("200d");
    } else if (btndata === "1y") {
      setDays("365d");
    } else if (btndata === "max") {
      setDays("max");
    }
  }

  const currency = currencyReverseMap[currencySymbol];
  // console.log("currency: ", currencySymbol);
  const [coindata, setCoindata] = useState({});
  const [description, setDescription] = useState("");
  const [newstring, setNewString] = useState("");
  const [displaystring, setDisplayString] = useState("");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const [indCoinError, setIndCoinError] = useState("");

  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  const descriptionRef = useRef(null);
  const readlessRef = useRef(null);
  const readmoreRef = useRef(null);

  useEffect(() => {
    // calling data for coin
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setCoindata(response.data);
        // console.log("before setdescription:", response.data.description.en);

        setDescription(editDescription(response.data?.description.en));
        // console.log("after setdescription:", response.data.description.en);
      })
      .catch((error) => {
        console.log(error);
        setIndCoinError(error);
      });
  }, [newstring, displaystring, url]);

  useEffect(() => {
    // for calling data for chart
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=${currency}&days=${days}`
      )
      .then((response) => {
        // console.log(response.data);
        setChartArray(response.data.prices);
      })
      .catch((error) => console.log(error));
  }, [days, currency, params.coinId]);

  function showDescription() {
    descriptionRef.current.innerText = newstring;
    readmoreRef.current.style.display = "none";
    readlessRef.current.style.display = "block";
  }
  function hideDescription() {
    descriptionRef.current.innerText = displaystring;
    readmoreRef.current.style.display = "block";
    readlessRef.current.style.display = "none";
  }

  // const backgroundColorHandler = () => {
  //   const percentArrow = useRef(null);
  //   console.log("bgcolor", percentArrow.current.backgroundColor);
  // };

  function editDescription(text) {
    // console.log("text:", text);
    let newstr = "";
    let flag = true;
    let displayedElipsis = false;
    let displaystr = "";
    // console.log("text?.length.......", text?.length);
    for (let i = 0; i < text?.length; i++) {
      // console.log("yooooooooo");
      if (text[i] !== "<" && text[i] !== ">" && flag === true) {
        // console.log(
        //   "text[i].................................................first",
        //   text[i]
        // );
        newstr += text[i];
        if (i > 300 && 300 < text.length) {
          // console.log("hahahhahaa");
          if (displayedElipsis === false) {
            displaystr += " ...";
            displayedElipsis = true;
          }
        } else {
          displaystr += text[i];
        }
      } else if (text[i] === "<") {
        // console.log(
        //   "text[i].................................................second",
        //   text[i]
        // );
        flag = false;
      } else if (text[i] === ">") {
        // console.log(
        //   "text[i].................................................third",
        //   text[i]
        // );
        flag = true;
      }
    }
    setNewString(newstr);
    // console.log("newstring state.%%%%%%%%%%%:", newstring);
    if (displayedElipsis === true) {
      // document.getElementById("read-more").style.display("block");
      // setShortDesc(displaystr)
      setDisplayString(displaystr);
      if (readmoreRef.current) {
        readmoreRef.current.style.display = "block";
      }
      // console.log("displaystring state.%%%%%%%%%%%:", displaystring);
      return displaystr;
    }
    // setDescription(newstr)
    return newstr;
  }

  return (
    <div className="coin-container">
      <h1>{error}</h1>
      <h1>{indCoinError}</h1>
      <div className="currency-header">
        <div className="left-container">
          <small className="button-like">
            Rank #{coindata.market_cap_rank}
          </small>
          <div className="name-container">
            <img
              src={coindata.image ? coindata.image.small : null}
              alt={coindata.name}
            />
            <h2>{coindata.name}</h2>
            <small className="button-like">
              {coindata.symbol ? coindata.symbol.toUpperCase() : null}
            </small>
          </div>
        </div>
        <div className="right-container">
          <h2>
            {currencySymbol}
            {coindata.market_data?.current_price[currency]?.toLocaleString()}
          </h2>
          <p className="button-like percentchange">
            <span>
              {coindata.market_data?.price_change_percentage_24h > 0
                ? "▲"
                : "▼"}
            </span>
            {coindata.market_data?.price_change_percentage_24h > 0
              ? coindata.market_data?.price_change_percentage_24h.toFixed(2)
              : -1 *
                coindata.market_data?.price_change_percentage_24h.toFixed(2)}
            %
          </p>
        </div>
      </div>
      <div className="day-change-container">
        <div>
          {/* <div style={parentDiv}></div>
          <ProgressBar /> */}
          <ProgressBar
            progress={
              (coindata.market_data?.current_price[currency] -
                coindata.market_data?.low_24h[currency]) /
              (coindata.market_data?.high_24h[currency] -
                coindata.market_data?.low_24h[currency])
            }
          />
        </div>
        <div className="day-change">
          <p>
            Low:{currencySymbol}
            {coindata.market_data?.low_24h[currency]?.toLocaleString()}
          </p>

          <p>24H Range</p>
          <p>
            High:{currencySymbol}
            {coindata.market_data?.high_24h[currency]?.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="statistics">
        <div className="market-cap-container stat-children">
          <p>Market Cap</p>
          <p>
            {currencySymbol}
            {coindata.market_data?.market_cap[currency]?.toLocaleString()}
          </p>
        </div>
        <div className="decorative-line"></div>
        <div className="volume-container stat-children">
          <p>Total Volume</p>
          <p>
            {currencySymbol}
            {coindata.market_data?.total_volume[currency]?.toLocaleString()}
          </p>
        </div>
        <div className="decorative-line"></div>
        <div className="max-supply-container stat-children">
          <p>Max Supply</p>
          <p>{coindata.market_data?.max_supply?.toLocaleString()}</p>
        </div>
        <div className="decorative-line"></div>
        <div className="circulating-supply-container stat-children">
          <p>Circulating Supply</p>
          <p>{coindata.market_data?.circulating_supply?.toLocaleString()}</p>
        </div>
        <div className="decorative-line"></div>
        <div className="ath-container stat-children">
          <p>All Time High</p>
          <p>
            {currencySymbol}
            {coindata.market_data?.ath[currency]?.toLocaleString()}
            <small className="ath-percent">
              {coindata.market_data?.ath_change_percentage[currency] > 0
                ? "▲"
                : "▼"}
              {coindata.market_data?.ath_change_percentage[currency] > 0
                ? coindata.market_data?.ath_change_percentage[currency].toFixed(
                    2
                  )
                : -1 *
                  coindata.market_data?.ath_change_percentage[currency].toFixed(
                    2
                  )}
              %
            </small>
          </p>
        </div>
        <div className="decorative-line"></div>
        <div className="atl-container stat-children">
          <p>All Time Low</p>
          <p>
            {currencySymbol}
            {coindata.market_data?.atl[currency]?.toLocaleString()}
            <small className="ath-percent">
              {coindata.market_data?.atl_change_percentage[currency] > 0
                ? "▲"
                : "▼"}
              {coindata.market_data?.atl_change_percentage[currency] > 0
                ? coindata.market_data?.atl_change_percentage[currency].toFixed(
                    2
                  )
                : -1 *
                  coindata.market_data?.atl_change_percentage[currency].toFixed(
                    2
                  )}
              %
            </small>
          </p>
        </div>
        <div className="decorative-line"></div>
      </div>
      <div className="chart-container">
        <CoinChart
          currencySymbol={currencySymbol}
          arr={chartArray}
          days={days}
        ></CoinChart>
        {daysBtns.map((item) => {
          return (
            <button
              key={item}
              onClick={() => changeDaysOnClick(item)}
              className="chartbtns"
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="decription-container">
        <h3>
          What is {coindata.name} ({coindata.symbol?.toUpperCase()})?{" "}
        </h3>

        <p ref={descriptionRef}>
          {/* {description ? editDescription(description) : null} */}
          {description}
        </p>
        <button
          id="read-more"
          className="button-like"
          ref={readmoreRef}
          onClick={() => showDescription()}
        >
          Read More ▼
        </button>
        <button
          id="read-less"
          className="button-like"
          ref={readlessRef}
          onClick={() => hideDescription()}
        >
          Read Less ▲
        </button>
      </div>
    </div>
  );
};

export default Coin;
