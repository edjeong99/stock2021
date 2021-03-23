import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    flexGrow: 3,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchInputFile: {
    paddingRight: 24, // keep right padding when drawer closed

    maxHeight: '30px',
  },
  searchIcon: {
    marginLeft: '10px',
  },
}));

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');
  const classes = useStyles();

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue);
    setSearchValue('');
  };

  return (
    <form className={classes.search}>
      <input
        className={classes.searchInputFile}
        value={searchValue}
        onChange={handleSearchInputChange}
        type='text'
      />
      <div
        onClick={callSearchFunction}
        type='submit'
        className={classes.searchIcon}
      >
        <SearchIcon />
      </div>
    </form>
  );
};

export default Search;
