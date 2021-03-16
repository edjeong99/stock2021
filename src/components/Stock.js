import React, { useState, useEffect } from "react";



  const Stock = ({stock}) => {
// console.log("Stock.js");







  // useEffect(() => {
  //   fetch(QUOTE_API_URL+`${stock.ticker}`+API_TOKEN)
  //     .then(response => response.json())
  //   .then(jsonResponse => {
  //     if(jsonResponse.c > 0){
  //     console.log( "stock.js useEffect" + stock.ticker);
   
  //     percentChange = (((jsonResponse.pc - jsonResponse.c)/jsonResponse.pc)*100).toFixed(2);
  //     jsonResponse = {...jsonResponse,"pChange" : percentChange};
  //     setQuote(jsonResponse);
      
  //     console.log(jsonResponse);
  //     }
  //     else{
  //       setErrorMessage(jsonResponse.Error);
 
  //     }
  //   })
  // },{});




    return(
      <div className = "stockCont">
      {stock.symbol ? 
        (        
        <div className = "stock">
          <h2>{stock.symbol}</h2>
          <p> {stock.latestPrice}</p>
          <p>{(stock.changePercent*100).toFixed(2)}%</p>
          <p>{stock.previousClose}</p>
          </div>
   ) : null
      }
 </div>
    );



  };

  export default Stock;