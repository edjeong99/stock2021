import React, { useState, useEffect } from 'react';

const Header = ({ text, update, handleUpdate }) => {
  const [updateText, setUpdateText] = useState();
  const [updateButtonText, setUpdateButtonText] = useState();

  useEffect(() => {
    console.log('Header  update = ' + update);
    handleUpdateText();
  }, [update]);

  const handleUpdateText = () => {
    console.log('Header  handleUpdateText');
    if (update) {
      setUpdateText('Updating every minute');
      setUpdateButtonText('Stop');
    } else {
      setUpdateText('Update Stopped');
      setUpdateButtonText('Start');
    }
  };

  return (
    <header className='App-header'>
      <h2>{text}</h2>
      <div className='autoRefresh'>
        <div>{updateText}</div>
        <button onClick={() => handleUpdate()}> {updateButtonText}</button>
      </div>
    </header>
  );
};

export default Header;
