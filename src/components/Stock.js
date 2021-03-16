import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


  const Stock = ({stock}) => {
// console.log("Stock.js");
// console.log(stock);
    return(
        <div className = "stock">
            <h2>{stock.symbol}</h2>
            <p>Current Price : {stock.c}</p>
            {/* <div>
                <img width = "200" alt = {`The movie titled : ${stock.Title}`} src={poster}/>
            </div>
            <p>({stock.Year})</p> */}
        </div>
    );



  };

  export default Stock;