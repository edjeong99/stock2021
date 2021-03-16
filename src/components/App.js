
import React, { useState, useEffect } from "react";
import Header from "./Header"
import Stock from "./Stock"
import Search from "./Search"
import '../css/App.css';


const QUOTE_API_URL = "https://finnhub.io/api/v1/quote?symbol="
const API_TOKEN = "&token=c17tckv48v6reqlb2f90"; 
const PROFILE_API_URL = "https://finnhub.io/api/v1/stock/profile2?symbol=";
const STOCK_SYMBOL_LIST = ["AMZN", "TRIP", "AAPL","TSLA", "WMT"];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [stockList, setStockList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    STOCK_SYMBOL_LIST.map((symbol) => {
      console.log("symbol = " + symbol);
    fetch(PROFILE_API_URL+symbol+API_TOKEN)
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
    .then(response => response.json())
    .then(jsonResponse => {
    
     
      console.log( jsonResponse);
      console.log( stockList);
      setStockList(stockList => [...stockList, jsonResponse]);
      setLoading(false);
      console.log( stockList);
    })
  });
  console.log(stockList);
  },[]);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(``)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === "True"){
        setStockList(jsonResponse.Search);
        setLoading(false);
      }
      else{
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    })
  }

  return (
    <div className="App">
      <Header text="Stocks" />
      <Search search = {search} />
      <p className="App-intro"> Current Stock Prices</p>
      <div className = "stocks">
        {loading && !errorMessage ? 
        (<span> Loading...</span>) 
        : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): 
        (
          stockList.map((stock, index) => (
            
            <Stock key={index} stock = {stock} />
          ))
        
        )
      
      }
      </div>
    </div>
  );
}

export default App;
