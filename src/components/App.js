
import React, { useState, useEffect } from "react";
import Header from "./Header"
import Stock from "./Stock"
import Search from "./Search"
import '../css/App.css';


const QUOTE_API_URL = "https://cloud.iexapis.com/stable/stock/"
const QUOTE_API_URL2 = "/quote";
const API_TOKEN = "?token=pk_9d1575de6ba8426b9a036edc8cd74274"; 

const STOCK_SYMBOL_LIST = ["AMZN", "TRIP", "AAPL","TSLA", "WMT"];

const App = () => {

  const [stockList, setStockList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    STOCK_SYMBOL_LIST.map((symbol) => {
      console.log("symbol = " + symbol);
    fetch(QUOTE_API_URL+symbol+QUOTE_API_URL2+API_TOKEN)
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
    .then(response => response.json())
    .then(jsonResponse => {
    
     
      console.log( jsonResponse);
      console.log( stockList);
      setStockList(stockList => [...stockList, jsonResponse]);
 
      console.log( stockList);
    })
  });
  console.log(stockList);
  },[]);

  const search = searchValue => {

    setErrorMessage(null);

    fetch(``)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === "True"){
        setStockList(jsonResponse.Search);
   
      }
      else{
        setErrorMessage(jsonResponse.Error);
 
      }
    })
  }

  return (
    <div className="App">
      <Header text="Stocks" />
      <Search search = {search} />
      <p className="App-intro"> Current Stock Prices</p>
      <div className = "stocks">

        {errorMessage ? (
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
