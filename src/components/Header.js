import React, { useState, useEffect } from 'react';

const Header = ({ text, update, handleUpdate }) => {
  //const [updateState, setupdateState] = useState(update);

  let refreshText,
    buttonText = 'Start Auto Refresh';

  useEffect(() => {
    console.log('Header  update = ' + update);
    handleRefreshText();
  }, [update]);

  const handleRefreshText = () => {
    if (update) {
      refreshText = 'Update Quote every minute';
      buttonText = 'Stop';
    } else {
      refreshText = 'Update Stopped';
      buttonText = 'Start';
    }
  };

  return (
    <header className='App-header'>
      <h2>{text}</h2>
      <div className='autoRefresh'>
        <div>{refreshText}</div>
        <button onClick={() => handleUpdate()}> {buttonText}</button>
      </div>
    </header>
  );
};

export default Header;
