import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import DisplayStocks from './DisplayStocks';
import Search from './Search';
import AutoUpdate from './AutoUpdate';
import SearchResult from './SearchResult';
import '../css/App.css';
import * as Constants from '../util/Constants';

const App = () => {
  const [stockList, setStockList] = useState(Constants.STOCK_SYMBOL_LIST);
  const [quoteList, setQuoteList] = useState([]);
  const [searchResultList, setSearchResultList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(true);
  const [count, setCounter] = useState(0);
  const [newStock, setNewStock] = useState(null);
  useEffect(() => {
    let id = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, Constants.UPDATE_INTERVAL_SECOND * 1000);
    return function () {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    // console.log('USE Effect update = ' + update);

    if (update) refreshStockQuote();
  }, [count]);

  const refreshStockQuote = () => {
    console.log('refreshStock StockList');
    console.log(stockList);
    setQuoteList([]);
    setNewStock(null);
    // console.log('refreshqu newStock = ' + newStock);
    stockList.forEach((symbol) => {
      getQuotes(symbol);
    });
  };

  const handleAdd = (symbol) => {
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
        setErrorMessage(e.message);
        setLoading(false);
        console.log('Search fetch has ERROR');
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

      <DisplayStocks
        quoteList={quoteList}
        deleteStock={deleteStock}
        newStock={newStock}
      />
    </div>
  );
};

export default App;
