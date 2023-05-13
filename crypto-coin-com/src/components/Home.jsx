import React from "react";
import CoinDetail from "./CoinDetail";
import TrendingCoins from "./TrendingCoins";
import Pagination from "./Pagination";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Coin from "./Coin";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Home = ({ coins, currencySymbol, handleCurrencyChange }) => {
  const [inputVal, setInputVal] = useState("");
  const [trendingCoins, setTrendingCoins] = useState([]);
  // const [dropdownfields, setDropdownfields] = useState([]);
  // console.log("dropdownfields:", dropdownfields);
  const dropdownRef = useRef(null);
  const searchCompRef = useRef(null);
  const documentContainerRef = useRef(null);
  const scrollToRef = useRef(null);

  // Pagination component to replace infinite scroll on Home to review all records
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(25);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  // const currentRecords = coins.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(coins.length / recordsPerPage);
  // create an array that holds all the page numbers from 1 to nPages.
  const N = nPages;
  const pageNumbers = Array.from({ length: N }, (_, index) => index + 1);
  console.log(pageNumbers);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search/trending`)
      .then((response) => {
        console.log(response.data);
        setTrendingCoins(response.data?.coins);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("trending coins:", trendingCoins);
  // Remove api method for search function because of performance (too slow because api endpoint supports only search for all results including coin/exchange/nft etc. without limit/per_page)
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/search?query=${inputVal}&per_page=100&page=1`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setDropdownfields(response.data?.coins);
  //       // console.log("dropdownfields:", dropdownfields);
  //     })
  //     .catch((error) => console.log(error));
  // }, [inputVal]);

  // using javascript functions of filter and includ to implement search functionality in already loaded api result of coins on home page
  function SearchThroughCoinsLoaded() {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(inputVal) ||
        coin.symbol.toLowerCase().includes(inputVal) ||
        coin.name.toUpperCase().includes(inputVal) ||
        coin.symbol.toUpperCase().includes(inputVal)
    );
  }

  function stringThisText(inputstr) {
    let stringArray = inputstr.split(" ");
    return stringArray.join(" ");
  }

  function hideDropDownDisplay(event) {
    console.log("consoling event.target...", event.target);
    dropdownRef.current.style.display = "none";
  }

  useEffect(() => {
    // let searchcomp = searchCompRef.current;
    let observerRefValue = null;
    if (dropdownRef.current) {
      console.log("helo", dropdownRef);
      dropdownRef.current.addEventListener("click", (event) =>
        event.stopPropagation()
      );
      observerRefValue = dropdownRef.current;
    }

    return () => {
      if (observerRefValue) {
        observerRefValue.removeEventListener("click", (event) =>
          event.stopPropagation()
        );
      }
    };
  }, []);

  useEffect(() => {
    let containerRef = documentContainerRef.current;
    if (containerRef) {
      console.log("containerref", containerRef);
      containerRef.addEventListener("click", (event) =>
        hideDropDownDisplay(event)
      );
    }

    return () => {
      containerRef.removeEventListener("blur", (event) =>
        hideDropDownDisplay(event)
      );
    };
  }, []);

  function showDropDownDisplay() {
    dropdownRef.current.style.display = "block";
  }

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = trendingCoins.map((coin) => {
    return (
      <Link
        to={`/coin/${coin.item.id}`}
        key={coin.item.id}
        element={<Coin currencySymbol={currencySymbol} />}
      >
        <TrendingCoins coin={coin} key={coin.item.id}></TrendingCoins>
      </Link>
    );
  });

  return (
    <div className="container" ref={documentContainerRef}>
      <div className="coin-card-container">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>

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

          <li ref={searchCompRef} tabIndex="0">
            <input
              placeholder="🔍 Search Coin"
              type="search"
              value={inputVal}
              // onChange={(event) => {
              //   this.setInputVal(event.target.value);
              //   this.showDropDownDisplay();
              // }}
              onChange={(event) => setInputVal(event.target.value)}
              onClick={(event) => showDropDownDisplay(event.target.value)}
            ></input>
            <div className="dropdown-container" ref={dropdownRef}>
              {SearchThroughCoinsLoaded().map((result) => {
                return (
                  <Link
                    to={`/coin/${result.id}`}
                    key={result.id}
                    element={<Coin currencySymbol={currencySymbol}></Coin>}
                  >
                    <div className="dropdown-left-right">
                      <div className="left-side">
                        <img
                          src={result.image}
                          alt=""
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

      <div className="home-content" ref={scrollToRef}>
        <div className="home-heading">
          <h3>#</h3>
          <h3 className="coin-name">Coin</h3>
          <h3>Price</h3>
          <h3 className="hide-mobile">24h %</h3>
          <h3 className="hide-mobile ">Volume</h3>
          <h3 className="hide-mobile ">Market Cap</h3>
        </div>
        {coins.slice(indexOfFirstRecord, indexOfLastRecord).map((coin) => {
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
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          scrollToRef={scrollToRef}
        />
      </div>
    </div>
  );
};

export default Home;
