import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import TypoGraphy from '@material-ui/core/TypoGraphy';

const Header = ({ text }) => {
  return (
    <div>
      <AppBar color='primary' position='fixed'>
        <Toolbar className='App-header'>
          <TypoGraphy variant='h4'>{text}</TypoGraphy>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
