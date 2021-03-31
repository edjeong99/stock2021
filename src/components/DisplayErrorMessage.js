import React from 'react';
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

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
