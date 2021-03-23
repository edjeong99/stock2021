import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue);
    setSearchValue('');
  };

  return (
    <form className='search'>
      <input
        className='searchInputFile'
        value={searchValue}
        onChange={handleSearchInputChange}
        type='text'
      />
      <div onClick={callSearchFunction} type='submit'>
        <SearchIcon />
      </div>
    </form>
  );
};

export default Search;
