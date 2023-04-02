import React, { useState, useEffect, useRef } from 'react';
import CmdLine from './CmdLine';
import OutputText from './OutputText';
import OutputSongs from './OutputSongs';
import './index.css';
import CmdInput from './CmdInput';

function Terminal(props) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <>
      <div className='terminal-wrapper'>
        <div className='terminal-header'>
          <span class="Terminal-btn Terminal-btn-close"></span>
          <span class="Terminal-btn Terminal-btn-minimize"></span>
          <span class="Terminal-btn Terminal-btn-maximize"></span>
        </div>
        <div className='terminal-content'>
          {props.history.map((item, _) => {
            switch (item.type) {
              case 'cmd':
                return <CmdLine cmd={item.content} />;
              case 'output-text':
                return <OutputText text={item.content} />;
              case 'output-songs':
                return <OutputSongs content={item.content} />;
            }
          })}
          {/* <CmdLine cmd="suggest-me -n 10 -singer Taylor Swift -song You believe in me" />
          <OutputSongs content={songs} />
          <CmdLine cmd="fun-fact 0" />
          <OutputText text={text} /> */}
          <CmdInput 
            currentCmd={props.currentCmd} 
            setCurrentCmd={props.setCurrentCmd}
            setHistory={props.setHistory}
            handleCmdSubmit={props.handleCmdSubmit}
          />

          <AlwaysScrollToBottom />
        </div>
      </div>
    </>
  )
}

export default Terminal;