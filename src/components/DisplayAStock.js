import React from 'react';

const DisplayAStock = ({ quote, deleteStock }) => {
  const handleDelete = () => {
    deleteStock(quote.symbol);
  };
  return (
    <div className='quoteCont'>
      {quote.symbol ? (
        <div className='quote'>
          <h2>{quote.symbol}</h2>
          <p> {quote.latestPrice}</p>
          <p>{(quote.changePercent * 100).toFixed(2)}%</p>
          <p>{quote.previousClose}</p>
          <button onClick={handleDelete} type='submit'>
            X{' '}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayAStock;
