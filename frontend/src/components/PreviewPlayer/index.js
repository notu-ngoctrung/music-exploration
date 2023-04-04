import React, { useState } from 'react';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function PreviewPlayer(props) {
  return (
    <>
      <AudioPlayer
        style={{
          borderRadius: '15px',
          padding: '1rem',
          marginTop: '1rem'
        }}
        autoPlay
        src={props.url}
        onPlay={e => console.log("onPlay", props.url)}
        hasDefaultKeyBindings={false}
        showSkipControls={false}
      />
    </>
  );
}

export default PreviewPlayer;