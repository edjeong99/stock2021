import React from "react";



  const DisplayResult = ({result, addStock}) => {

const addThisSymbol = () => {
  addStock(result.symbol);
}
    return(
      <button className = "displayResult" onClick={addThisSymbol}>
   <h2>{result.symbol}</h2>
 </button>
    );



  };

  export default DisplayResult;