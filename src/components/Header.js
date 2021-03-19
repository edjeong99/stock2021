import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';

const Header = ({ text, update, handleUpdate }) => {
  const [updateText, setUpdateText] = useState();
  const [updateButtonText, setUpdateButtonText] = useState();

  useEffect(() => {
    handleUpdateText();
  }, [update]);

  const handleUpdateText = () => {
    if (update) {
      setUpdateText('Updating every minute');
      setUpdateButtonText('Stop');
    } else {
      setUpdateText('Update Stopped');
      setUpdateButtonText('Start');
    }
  };

  return (
    <div>
      <AppBar color='primary' position='fixed'>
        <h2>{text}</h2>
      </AppBar>

      <div className='autoRefresh'>
        <div>{updateText}</div>
        <button onClick={() => handleUpdate()}> {updateButtonText}</button>
      </div>
    </div>
  );
};

export default Header;
