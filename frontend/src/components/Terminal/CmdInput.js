import React, { useState } from 'react';

function CmdInput(props) {
  const handleInputChange = (e) => {
    props.setCurrentCmd(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(props.currentCmd);
      props.setHistory(hist => {
        const newHist = [...hist];
        newHist.push({
          type: 'cmd',
          content: props.currentCmd,
        });
        return newHist;
      });

      props.handleCmdSubmit(props.currentCmd);

      props.setCurrentCmd('');
    }
  };    


  return (
    <div className='cmdline-wrapper'> 
      <span className='cmdline-icon'>❯</span> 
      <input 
        autoFocus
        className='cmdinput-input'
        value={props.currentCmd}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default CmdInput;