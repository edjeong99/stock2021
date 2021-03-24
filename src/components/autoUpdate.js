import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

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

const AutoUpdate = ({ update, handleUpdate }) => {
  const [updateText, setUpdateText] = useState();
  const [updateButtonText, setUpdateButtonText] = useState();

  const classes = useStyles();

  useEffect(() => {
    handleUpdateText();
  }, [update]);

  const handleUpdateText = () => {
    if (update) {
      setUpdateText('Update every 30sec');
      setUpdateButtonText('Stop');
    } else {
      setUpdateText('Update Stopped');
      setUpdateButtonText('Start');
    }
  };

  return (
    <div className={classes.autoUpdate}>
      <div>{updateText}</div>
      <button onClick={() => handleUpdate()}> {updateButtonText}</button>
    </div>
  );
};

export default AutoUpdate;
// strange - file name in github has lowercase
