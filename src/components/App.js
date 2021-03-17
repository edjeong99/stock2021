
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
    stockList.forEach(symbol => {
     addStock(symbol);
     })
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

  const handleAdd = symbol => {
    addStock(symbol);
    setSearchResultList([]);
  }
const addStock = symbol =>{
  console.log(symbol);
  fetch(QUOTE_API_URL+symbol+QUOTE_API_URL2+API_TOKEN)
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
    .then(response => response.json())
    .then(jsonResponse => {
        setStockList(stockList => [...stockList, jsonResponse]);
        
    })
  }
  
  const deleteStock = symbol => {
    const newStockList = stockList.filter(stock => stock.symbol !== symbol);
    setStockList(newStockList);
  }


  let searchResult = null;
  if(loading){
    searchResult = (<div className = "searchResultWindow"><h3> Loading</h3> </div>)
  }
  else if(searchResultList.length > 0){
    searchResult =  (
      <div className = "searchResultWindow">
        <h3>Choose a Symbol to add to the list below</h3>
        <div className = "searchResult">
        
      {searchResultList.map((result, index) => 
         <DisplayResult key = {index} result = {result} handleAdd={handleAdd}/>
      )}
      
</div>
<button onClick={() => setSearchResultList([])}>Cancel</button>
</div>
    )
      }

  

let displayStocks = (<div className = "stocks">
  {stockList.map((stock, index) => (
    
    <Stock key={index} stock = {stock} deleteStock={deleteStock}/>
  ))}
  </div>) ;
if(errorMessage)
displayStocks = (<div className = "stocks">
  <div className="errorMessage">{errorMessage}</div></div>)


const headings = (
  <div className="App-intro"> 
  <p></p>
    <p>Current Prices</p>
    <p>% change</p>
    <p>previousClose</p>
    <p></p>

  </div>
)

 
  return (
    <div className="App">
      <Header text="Stocks" />
      <Search search = {search} />
      {searchResult}
      {headings}
      {displayStocks}
      
    </div>
  );
}

export default App;
