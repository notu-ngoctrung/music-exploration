import React, { useState, useEffect, useRef } from 'react';
import CmdLine from './CmdLine';
import OutputText from './OutputText';
import OutputSongs from './OutputSongs';
import './index.css';
import CmdInput from './CmdInput';
import Siriwave from 'react-siriwave';
import PreviewPlayer from '../PreviewPlayer';
import HelpSection from './HelpSection.js';
import SongInfo from './SongInfo';

/**
 * Terminal component.
 * 
 * It displays the terminal and sets out the logical rules.
 */
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
              case 'help':
                return <HelpSection cmds={item.content} />;
              case 'output-info':
                return <SongInfo song={item.content} />;
            }
          })}

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