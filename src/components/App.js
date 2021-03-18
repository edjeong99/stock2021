import React, { useState, useEffect } from 'react';
import Header from './Header';
import Stock from './Stock';
import Search from './Search';
import DisplayResult from './DisplayResult';
import '../css/App.css';
import * as Constants from '../util/Constants';

let intervalID;

const App = () => {
  const [stockList, setStockList] = useState(Constants.STOCK_SYMBOL_LIST);
  const [quoteList, setQuoteList] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (update) {
      intervalID = setInterval(() => {
        refreshStockQuote();
        console.log('setInterval update ' + intervalID);
      }, 10000);
    } else {
      console.log(' CLEARINTERVAL ' + intervalID);
      clearInterval(intervalID);
    }
  }, [update]);

  const refreshStockQuote = () => {
    setQuoteList([]);
    stockList.forEach((symbol) => {
      getQuotes(symbol);
    });
  };

  const handleAdd = (symbol) => {
    setStockList((stockList) => [...stockList, symbol]);
    getQuotes(symbol);
    setSearchResultList([]);
  };
  const getQuotes = (symbol) => {
    console.log(symbol);
    fetch(
      Constants.QUOTE_API_URL +
        symbol +
        Constants.QUOTE_API_URL2 +
        Constants.API_TOKEN
    )
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        let newQuoteList = [...quoteList, jsonResponse];

        setQuoteList((quoteList) => [...quoteList, jsonResponse]);
      });
  };

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(Constants.SEARCH_URL1 + searchValue + Constants.SEARCH_URL2)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.result.length > 0) {
          console.log(jsonResponse.result);
          setSearchResultList(jsonResponse.result);
          setLoading(false);
        } else {
          console.log('Search error');
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const deleteStock = (symbol) => {
    const newStockList = stockList.filter((stock) => stock !== symbol);
    setStockList(newStockList);
    const newQuoteList = quoteList.filter((stock) => stock.symbol !== symbol);
    setQuoteList(newQuoteList);
  };

  const handleUpdate = () => {
    setUpdate((update) => !update);
    console.log('update changed');
  };

  let searchResult = null;
  if (loading) {
    searchResult = (
      <div className='searchResultWindow'>
        <h3> Loading</h3>{' '}
      </div>
    );
  } else if (searchResultList.length > 0) {
    searchResult = (
      <div className='searchResultWindow'>
        <h3>Choose a Symbol to add to the list below</h3>
        <div className='searchResult'>
          {searchResultList.map((result, index) => (
            <DisplayResult key={index} result={result} handleAdd={handleAdd} />
          ))}
        </div>
        <button onClick={() => setSearchResultList([])}>Cancel</button>
      </div>
    );
  }

  let displayStocks = (
    <div className='stocks'>
      {quoteList.map((quote, index) => (
        <Stock key={index} stock={quote} deleteStock={deleteStock} />
      ))}
    </div>
  );
  if (errorMessage)
    displayStocks = (
      <div className='stocks'>
        <div className='errorMessage'>{errorMessage}</div>
      </div>
    );

  const headings = (
    <div className='App-intro'>
      <p></p>
      <p>Current Prices</p>
      <p>% change</p>
      <p>previousClose</p>
      <p></p>
    </div>
  );

  return (
    <div className='App'>
      <Header text='Stocks' update={update} handleUpdate={handleUpdate} />
      <Search search={search} />
      {searchResult}
      {headings}
      {displayStocks}
    </div>
  );
};

export default App;
