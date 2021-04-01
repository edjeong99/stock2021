import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import DisplayStocks from './DisplayStocks';
import Search from './Search';
import AutoUpdate from './AutoUpdate';
import SearchResult from './SearchResult';
import DisplayErrorMessage from './DisplayErrorMessage';
import '../css/App.css';
import * as Constants from '../util/Constants';

const App = () => {
  // stockList is an array of stock symbols.  It will use localstorage to keep persistant data
  const [stockList, setStockList] = useState(Constants.STOCK_SYMBOL_LIST);
  //quoteList contains detailed info about a stock, including price
  const [quoteList, setQuoteList] = useState([]);
  // searchResultList is result of a user search.  It has list of stock symbols that match search
  const [searchResultList, setSearchResultList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  //update is boolean signify if user wants an auto update or not
  const [update, setUpdate] = useState(true);
  // counter is used for auto update.  It trigger am update
  const [counter, setCounter] = useState(0);
  // newStock sets to a symbol of a newly added stock.  resets to null at update.
  const [newStock, setNewStock] = useState(null);

  useEffect(() => {
    init();
    let id = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, Constants.UPDATE_INTERVAL_SECOND * 1000);
    return function () {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    // console.log('USE Effect update = ' + update);
    if (update) refreshStockQuote();
  }, [counter]);

  // init function gets value for stockList either from localStorage or initial value
  // localStorage is used to keep persistent state for stockList (ie browser refresh)
  const init = () => {
    console.log('Init executed');
    let localStorageStockList = JSON.parse(localStorage.getItem('stockList'));

    if (localStorageStockList) {
      setStockList(localStorageStockList);
    } else {
      setStockList(Constants.STOCK_SYMBOL_LIST);
      localStorage.setItem(
        'stockList',
        JSON.stringify(Constants.STOCK_SYMBOL_LIST)
      );
    }

    // check network and let user know if network is online or offline
    window.addEventListener('offline', () => {
      // Update your UI to reflect that there's no connection.
    });

    window.addEventListener('online', () => {
      // Update your UI to reflect that the connection is back.
    });
  };
  const refreshStockQuote = () => {
    console.log('refreshStock StockList');
    console.log(stockList);
    setQuoteList([]);
    setNewStock(null);

    stockList.forEach((symbol) => {
      getQuotes(symbol);
    });
  };

  const handleAdd = (symbol) => {
    localStorage.setItem('stockList', JSON.stringify([...stockList, symbol]));
    setStockList((stockList) => [...stockList, symbol]);

    setNewStock(symbol);
    getQuotes(symbol);
    setSearchResultList([]);
  };

  const getQuotes = (symbol) => {
    setLoading(true);

    fetch(
      Constants.QUOTE_API_URL +
        symbol +
        Constants.QUOTE_API_URL2 +
        Constants.QUOTE_API_TOKEN
    )
      // `{${QUOTE_API_URL}+${symbol}+ ${API_TOKEN}}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('getQuotes symbol ' + symbol);
        console.log(quoteList);
        setQuoteList((quoteList) =>
          // sort result alphabetically
          [...quoteList, { ...jsonResponse }].sort((a, b) =>
            a.symbol > b.symbol ? 1 : -1
          )
        );
        setLoading(false);
      })
      .catch((e) => {
        handleError(e.message);
      });
    //.catch(err => setHasError(true))
  };

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(Constants.SEARCH_URL1 + searchValue + Constants.SEARCH_API_TOKEN)
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
      })
      .catch((e) => {
        handleError(e.message);
      });
  };
  const handleError = (message) => {
    setLoading(false);
    setErrorMessage(message);
    setTimeout((errorMessage) => setErrorMessage(null), 5000);
  };

  const deleteStock = (symbol) => {
    const newStockList = stockList.filter((stock) => stock !== symbol);
    setStockList(newStockList);
    localStorage.setItem('stockList', JSON.stringify(newStockList));
    const newQuoteList = quoteList.filter((stock) => stock.symbol !== symbol);
    setQuoteList(newQuoteList);
  };

  const handleUpdate = () => {
    setUpdate((update) => !update);
  };

  const handleSearch = (symbol) => {
    if (symbol) handleAdd(symbol); // if user didn't clicked 'cancel', add symbol
    setSearchResultList(null);
  };

  return (
    <div className='App'>
      <CssBaseline />

      <Header text='Stocks' />
      <div className='searchField'>
        <Search search={search} />
        <AutoUpdate update={update} handleUpdate={handleUpdate} />
      </div>
      <SearchResult
        loading={loading}
        errorMessage={errorMessage}
        searchResultList={searchResultList}
        handleSearch={handleSearch}
      />
      <DisplayErrorMessage errorMessage={errorMessage} />
      <DisplayStocks
        quoteList={quoteList}
        deleteStock={deleteStock}
        newStock={newStock}
      />
    </div>
  );
};

export default App;
