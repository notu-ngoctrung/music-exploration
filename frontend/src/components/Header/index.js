import React from 'react';
import THEME from '../../color-scheme';

import './index.css';

function Header() {
  return (
    <>
      <div id="header" className='wrapper'>
        <p style={{
          fontSize: '3.5rem',
          fontWeight: 600,
          marginTop: '4rem',
          marginBottom: '2.5rem'
        }}>
          <label style={{ color: THEME.secondaryDarker }}>MUSIC</label> EXPLORATION
        </p>

        <div id="powered">
          powered by <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" /> 
          // <img  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" />
        </div>
        <div style={{marginTop: '0.5rem'}}>
          brought to you by <a href="https://github.com/notu-ngoctrung" target={'_blank'} style={{
            textDecorationLine: 'underline',
          }} title="Trung Nguyen">@notu-ngoctrung</a>.
        </div>
        <div style={{marginTop: '0.5rem'}}>
          <b>need help?</b> click <a href="https://github.com/notu-ngoctrung" target={'_blank'} style={{
            textDecorationLine: 'underline',
          }} title="Trung Nguyen">here</a>.
        </div>
      </div>
    </>
  );
}

export default Header;