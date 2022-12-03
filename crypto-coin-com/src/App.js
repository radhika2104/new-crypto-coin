import React from "react";
import "./styles/App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Exchanges from "./components/Exchanges";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Coin from "./components/Coin";

function App() {
  const currencyMap = { inr: "₹", usd: "$", aed: "د.إ", eur: "€", btc: "฿" };
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState("");

  const [currency, setCurrency] = useState("inr");
  const [url, setURL] = useState(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  );
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, [url]);

  const handleCurrencyChange = (eventTargetValue) => {
    setCurrency(eventTargetValue);
    setURL(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${eventTargetValue}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );

    setCurrencySymbol(currencyMap[eventTargetValue]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              coins.length ? (
                <Home
                  coins={coins}
                  handleCurrencyChange={handleCurrencyChange}
                  currencySymbol={currencySymbol}
                />
              ) : (
                <h1>{error}</h1>
              )
            }
          ></Route>
          <Route path="/Exchanges" element={<Exchanges />}></Route>
          <Route
            path="/coin"
            element={<Coin currencySymbol={currencySymbol} />}
          >
            <Route
              path=":coinId"
              element={<Coin currencySymbol={currencySymbol} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
