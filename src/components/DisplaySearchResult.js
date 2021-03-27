import React from 'react';

const DisplaySearchResult = ({ result, handleSearch }) => {
  const addThisSymbol = () => {
    handleSearch(result.symbol);
  };
  return (
    <button className='displayResult' onClick={addThisSymbol}>
      <h2>{result.symbol}</h2>
    </button>
  );
};

export default DisplaySearchResult;
