import React from 'react';
import Loader from './Loader';
import DisplaySearchResult from './DisplaySearchResult';

const SearchResult = ({
  loading,
  errorMessage,
  searchResultList,
  handleSearch,
}) => {
  console.log('SearchResult');
  console.log(
    'loading = ' +
      loading +
      ' errorMessag = ' +
      errorMessage +
      'searchResultList = ' +
      searchResultList
  );

  if (searchResultList) {
    return (
      <div className='searchResultWindow'>
        <h3>Choose a Symbol to add to the list below</h3>
        <div className='searchResult'>
          {searchResultList.map((result, index) => (
            <DisplaySearchResult
              key={index}
              result={result}
              handleSearch={handleSearch}
            />
          ))}
        </div>
        <button onClick={handleSearch}>Cancel</button>
      </div>
    );
  }
  return (
    <div className='searchResultWindow'>
      {loading && <Loader />}
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
};

export default SearchResult;
