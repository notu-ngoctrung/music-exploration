import React, { useState } from 'react';
import DisplaySong from './DisplaySong';

/**
 * Component of displayed list of songs.
 * 
 * This calls <DisplaySong />
 */
function OutputSongs(props) {
  return (
    <>
      {props.content.map((val, id) => {
        return <DisplaySong song={val} id={id}/>
      })}
    </>
  );
}

export default OutputSongs;