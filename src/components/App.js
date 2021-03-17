
import React, { useState, useEffect } from "react";
import Header from "./Header"
import Stock from "./Stock"
import Search from "./Search"

import DisplayResult from "./DisplayResult"
import '../css/App.css';


const QUOTE_API_URL = "https://cloud.iexapis.com/v1/stock/"
const QUOTE_API_URL2 = "/quote";
const API_TOKEN = "?token=pk_9d1575de6ba8426b9a036edc8cd74274"; 

let STOCK_SYMBOL_LIST = ["AMZN" , "TRIP","AAPL","TSLA", "WMT"]; 
// , "TRIP","AAPL","TSLA", "WMT"];


const SEARCH_URL1 ="https://finnhub.io/api/v1/search?q=";
const SEARCH_URL2 ="&token=c17tckv48v6reqlb2f90"




const App = () => {

  const [stockList, setStockList] = useState(STOCK_SYMBOL_LIST);
  const [searchResultList, setSearchResultList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    stockList.map((symbol) => {
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
    setLoading(true);
    setErrorMessage(null);
    
    fetch(SEARCH_URL1+searchValue+SEARCH_URL2)
    .then(response => response.json())
    .then(jsonResponse => {

      if(jsonResponse.result.length > 0){
        console.log(jsonResponse.result);
        setSearchResultList(jsonResponse.result);
        setLoading(false);
      }
      else{
        console.log("Search error");
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    })
 
    

  }

const addStock = symbol =>{
  console.log(symbol);
  fetch(QUOTE_API_URL+symbol+QUOTE_API_URL2+API_TOKEN)
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
    .then(response => response.json())
    .then(jsonResponse => {
        setStockList(stockList => [...stockList, jsonResponse]);
        setSearchResultList([]);
    })
  }
  
  const deleteStock = symbol => {
    const newStockList = stockList.filter(stock => stock.symbol !== symbol);
    setStockList(newStockList);
  }


  let searchResult = null;
  if(loading){
    searchResult = (<div className = "searchResultLoading"> Loading </div>)
  }
  else if(searchResultList.length > 0){
    searchResult =  (
      <div className = "searchResult">
         
      {searchResultList.map((result, index) => 
         <DisplayResult key = {index} result = {result} addStock={addStock}/>
      )}
</div>
    )
      }

  
 
  return (
    <div className="App">
      <Header text="Stocks" />
      <Search search = {search} />
     {searchResult}
      <p className="App-intro"> Current Stock Prices</p>
      <div className = "stocks">

        {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): 
        (
          stockList.map((stock, index) => (
            
            <Stock key={index} stock = {stock} deleteStock={deleteStock}/>
          ))
        
        )
      
      }
      </div>
    </div>
  );
}

export default App;
