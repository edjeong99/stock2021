import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = ({ text }) => {
  return (
    <div>
      <AppBar color='primary' position='fixed'>
        <Toolbar className='App-header'>
          <Typography variant='h4'>{text}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
