import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ExchangeItem from "./ExchangeItem";
import "../styles/Exchanges.css";
import Pagination from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  // const currentRecords = exchange.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(exchange.length / recordsPerPage);
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
      {exchange.slice(indexOfFirstRecord, indexOfLastRecord).map((obj) => {
        return <ExchangeItem key={obj.id} exchange={obj}></ExchangeItem>;
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
  );
};

export default Exchanges;
