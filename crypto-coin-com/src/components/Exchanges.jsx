import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ExchangeItem from "./ExchangeItem";
import "../styles/Exchanges.css";
import PaginationE from "./PaginationE";

const Exchanges = () => {
  const [exchange, setExchanges] = useState([]);
  const scrollToRef = useRef(null);
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

  // Pagination component to replace infinite scroll on Home to review all records
  // User is currently on this page
  const [currentPageE, setCurrentPageE] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPageE] = useState(10);
  const indexOfLastRecordE = currentPageE * recordsPerPageE;
  const indexOfFirstRecordE = indexOfLastRecordE - recordsPerPageE;
  // Records to be displayed on the current page
  // const currentRecords = exchange.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPagesE = Math.ceil(exchange.length / recordsPerPageE);
  // create an array that holds all the page numbers from 1 to nPages.
  const NE = nPagesE;
  const pageNumbersE = Array.from({ length: NE }, (_, index) => index + 1);
  console.log(pageNumbersE);
  const nextPageE = () => {
    if (currentPageE !== nPagesE) setCurrentPageE(currentPageE + 1);
  };
  const prevPageE = () => {
    if (currentPageE !== 1) setCurrentPageE(currentPageE - 1);
  };
  return (
    <div className="container">
      <h2 className="cyptocurrency-heading" ref={scrollToRef}>
        Top Cryptocurrency Spot Exchanges
      </h2>
      <div className="heading">
        <h3>#</h3>
        <h3 className="coin-name">Exchange</h3>
        <h3>Score</h3>
        <h3 className="hide-mobile">BTC Trading Volume (24h)</h3>
        <h3 className="hide-mobile">Year Established</h3>
      </div>
      {exchange.slice(indexOfFirstRecordE, indexOfLastRecordE).map((obj) => {
        return <ExchangeItem key={obj.id} exchange={obj}></ExchangeItem>;
      })}
      <PaginationE
        pageNumbers={pageNumbersE}
        currentPage={currentPageE}
        setCurrentPage={setCurrentPageE}
        prevPage={prevPageE}
        nextPage={nextPageE}
        scrollToRef={scrollToRef}
      />
    </div>
  );
};

export default Exchanges;
