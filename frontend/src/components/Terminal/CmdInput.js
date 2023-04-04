import React, { useState } from 'react';

function CmdInput(props) {
  const [cmdHist, setCmdHist] = useState(['']);
  const [cmdId, setCmdId] = useState(0);

  const handleInputChange = (e) => {
    props.setCurrentCmd(e.target.value);
  };

  const handleKeyDown = (e) => {
    // console.log(e.key);
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

      setCmdHist(hist => {
        const newHist = [...hist];
        newHist[newHist.length - 1] = props.currentCmd;
        newHist.push('');
        setCmdId(newHist.length - 1);
        return newHist;
      });


      props.setCurrentCmd('');
    }

    else if (e.key === 'ArrowUp') {
      setCmdId(id => {
        const newId = id - 1 >= 0 ? id - 1 : 0;
        props.setCurrentCmd(cmdHist[newId]);
        return newId;
      });
    }
    else if (e.key === 'ArrowDown') {
      setCmdId(id => {
        const newId = id + 1 < cmdHist.length ? id + 1 : cmdHist.length - 1;
        props.setCurrentCmd(cmdHist[newId]);
        return newId;
      });
    }
  };    


  return (
    <div className='cmdline-wrapper'> 
      <span className='cmdline-icon'>❯</span> 
      <input 
        // onBlur={(e) => e.target.focus()}
        placeholder='suggest-me --limit 5 --song Hello --singer Adele'
        autoFocus
        readOnly={props.loading}
        className='cmdinput-input'
        value={props.currentCmd}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default CmdInput;