import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Coin.css";
import { useRef } from "react";
import ProgressBar from "./ProgressBar";
// import ReactReadMoreReadLess from "react-read-more-read-less";

const Coin = ({ currencySymbol }) => {
  const currencyReverseMap = {
    "₹": "inr",
    $: "usd",
    "د.إ": "aed",
    "€": "eur",
    "฿": "btc",
  };

  const currency = currencyReverseMap[currencySymbol];
  // console.log("currency: ", currencySymbol);
  const [coindata, setCoindata] = useState({});
  const [description, setDescription] = useState("");
  // const [shortDesc, setShortDesc] = useState("");
  // const [readMore, setReadMore] = useState(false);
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setCoindata(response.data);
        // console.log("before setdescription:", response.data.description.en);
        setDescription(response.data?.description.en);
        // console.log("after setdescription:", response.data.description.en);
      })
      .catch((error) => console.log(error));
  }, []);

  // const backgroundColorHandler = () => {
  //   const percentArrow = useRef(null);
  //   console.log("bgcolor", percentArrow.current.backgroundColor);
  // };

  // function showDescription(){
  //   setReadMore(true)
  //   if (readMore === false){
  //     // p tag to show short description
  //     // show read more btn
  //   } else {
  //     // p tag to show  description
  //     // show read less btn
  //   }
  // }

  // function hideDescription(){
  //   setReadMore(false)

  //   if (readMore === false){
  //     // p tag to show short description
  //     // show read more btn
  //   } else {
  //     // p tag to show  description
  //     // show read less btn
  //   }
  // }
  function editDescription(text) {
    // console.log("text:", text);
    let newstr = "";
    let flag = true;
    let displayedElipsis = false;
    let displaystr = "";
    console.log("text?.length.......", text?.length);
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
    console.log("newstr:", newstr);
    if (displayedElipsis === true) {
      // document.getElementById("read-more").style.display("block");
      // setShortDesc(displaystr)
      return displaystr;
    }
    // setDescription(newstr)
    return newstr;
  }

  return (
    <div className="coin-container">
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
      <div className="decription-container">
        <h3>
          What is {coindata.name} ({coindata.symbol?.toUpperCase()})?{" "}
        </h3>
        {/* <ReactReadMoreReadLess
          charLimit={200}
          readMoreText={"Read more ▼"}
          readLessText={"Read less ▲"}
        >
          {coindata.description?.en}
        </ReactReadMoreReadLess> */}
        <p>{description ? editDescription(description) : null}</p>
        {/* <button
          id="read-more"
          className="button-like"
          onClick={()=> showDescription()}
        >
          Read More ▼
        </button>
        <button id="read-less" className="button-like" onClick={()=> hideDescription()}>
          Read Less ▲
        </button> */}
      </div>
    </div>
  );
};

export default Coin;
