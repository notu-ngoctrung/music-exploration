import React, { useState } from 'react';

/**
 * Component of each displayed song
 */
function DisplaySong(props) {
  return (
    <>
      <div className='displaysong-wrapper'>
        <span>{props.id + 1}.</span>
        <img src={props.song['image_url']} />
        <div className='displaysong-info'>
          <span><span className='displaysong-info-title'>song: </span>{props.song['name']}</span> <br />
          <span><span className='displaysong-info-title'>singer(s): </span> {props.song['singers'].map(s => s['name']).join(', ')}</span> <br />
          <span><span className='displaysong-info-title'>release date: </span> {props.song['release_date']}</span> <br />
          <span className='displaysong-info-title'>spotify url: </span> <a className="displaysong-spotify-url" target={'_blank'} href={props.song['song_url']}>{props.song['song_url']}</a> <br />
          <span><span className='displaysong-info-title'>spotify popularity: </span> {props.song['popularity']}</span> <br />
        </div>
      </div>
    </>
  );
}

export default DisplaySong;