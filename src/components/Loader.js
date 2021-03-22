import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return (
    <div className='loader'>
      <CircularProgress color='inherit' />;
    </div>
  );
};

export default Loader;
