import React from 'react';
import DisplayAStock from './DisplayAStock';

const DisplayStocks = ({ quoteList, deleteStock }) => {
  const handleDelete = (symbol) => {
    deleteStock(symbol);
  };

  return (
    <div className='stocks'>
      {quoteList.map((quote, index) => (
        <DisplayAStock key={index} quote={quote} deleteStock={handleDelete} />
      ))}
    </div>
  );
};

export default DisplayStocks;
