import React, { useState, useEffect } from "react";

  const QUOTE_API_URL = "https://finnhub.io/api/v1/quote?symbol="
  const API_TOKEN = "&token=c17tckv48v6reqlb2f90"; 

  const Stock = ({stock}) => {
// console.log("Stock.js");



const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(QUOTE_API_URL+`${stock.ticker}`+API_TOKEN)
      .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.c > 0){
      console.log( "stock.js useEffect" + stock.ticker);
      console.log( jsonResponse);
  
      setQuote(jsonResponse);
      setLoading(false);
      console.log( quote);
      }
      else{
        setErrorMessage(jsonResponse.Error);
 
      }
    })
  },{});




    return(
      <div className = "stock">
      {!loading && quote && stock.ticker ? 
        (        
        <div>
          <h2>{stock.ticker}</h2>
          <p>Current Price : {quote.c}</p>
          </div>
   ) 
        : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>)
       : null 
      }
 </div>
    );



  };

  export default Stock;