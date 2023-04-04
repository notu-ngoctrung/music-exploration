import React, { useState, useEffect, useRef } from 'react';
import CmdLine from './CmdLine';
import OutputText from './OutputText';
import OutputSongs from './OutputSongs';
import './index.css';
import CmdInput from './CmdInput';
import Siriwave from 'react-siriwave';
import PreviewPlayer from '../PreviewPlayer';

function Terminal(props) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    useEffect(() => elementRef.current.scrollIntoView(), [props.loading]);
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
                return <OutputText text={item.content} setLoading={props.setLoading} typingEnabled={item.typingEnabled || false} />;
              case 'output-songs':
                return <OutputSongs content={item.content} />;
            }
          })}
          {/* <OutputText text={"something <a href=\"https://google.com\"> google </a>"} /> */}
          {/* <CmdLine cmd="suggest-me -n 10 -singer Taylor Swift -song You believe in me" />
          <OutputSongs content={songs} />
          <CmdLine cmd="fun-fact 0" />
          <OutputText text={text} /> */}

          <div style={{
            display: props.loading ? 'block' : 'none',
          }}>
            <Siriwave
              theme='ios9'
              speed={0.05}
              amplitude={2}
              width={300}
              height={100}
            />    
          </div>

          {props.audioPreview['enabled'] && (
            <PreviewPlayer url={props.audioPreview['url']} />
          )}

          <CmdInput 
            history={props.history}
            loading={props.loading}
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