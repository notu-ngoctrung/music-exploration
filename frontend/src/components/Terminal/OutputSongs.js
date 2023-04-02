import React, { useState } from 'react';
import DisplaySong from './DisplaySong';

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