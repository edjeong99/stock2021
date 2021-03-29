import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import * as Constants from '../util/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  autoUpdate: {
    flexGrow: 1,
    fontSize: '1rem',
    margin: '5px',
  },
}));

const DisplayErrorMessage = ({ errorMessage }) => {
  return (
    <div className='searchResultWindow'>
      {errorMessage && (
        <Alert severity='error'>
          <Typography align='center|right'>{errorMessage}</Typography>
        </Alert>
      )}
    </div>
  );
};

export default DisplayErrorMessage;
