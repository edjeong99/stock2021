import React from "react";



  const Stock = ({stock}) => {


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