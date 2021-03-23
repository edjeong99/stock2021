import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  TextField,
  Button,
} from '@material-ui/core';
import TypoGraphy from '@material-ui/core/TypoGraphy';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = ({ text, update, handleUpdate, search }) => {
  const [query, setQuery] = useState('');
  const classes = useStyles();

  const onChangeSearchTitle = (e) => {
    console.log('onChangeSearch');
    const searchTitle = e.target.value;
    setQuery(searchTitle);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    console.log('search executed query = ' + query);
    search(query);
    setQuery('');
  };

  return (
    <div className={classes.root}>
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          <TypoGraphy className={classes.title} variant='h4'>
            {text}
          </TypoGraphy>
          <div className={classes.search} onSubmit={callSearchFunction}>
            <div className={classes.searchIcon}>
              <Button
                size='small'
                variant='outlined'
                className={classes.textField}
                onClick={callSearchFunction}
              ></Button>
              <SearchIcon />
            </div>
            <TextField
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              label='Search by title'
              value={query}
              onChange={onChangeSearchTitle}
            />
            {
              //           <InputBase placeholder='Search…' classes={{root: classes.inputRoot,input: classes.inputInput,
              //}              }              inputProps={{ 'aria-label': 'search' }}            />
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
