import React from 'react';
import THEME from '../../color-scheme';

import './index.css';
import HeaderLogo from './HeaderLogo';

/**
 * Application header
 */
function Header() {
  return (
    <>
      <div id="header" className='wrapper'>
        <HeaderLogo />
        <div id="powered">
          powered by <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" />
          // <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" />
          // <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Billboard_logo.svg/280px-Billboard_logo.svg.png" />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          brought to you by <a href="https://github.com/notu-ngoctrung" target={'_blank'} style={{
            textDecorationLine: 'underline',
          }} title="Trung Nguyen">@notu-ngoctrung</a>.
        </div>
        {/* <div style={{marginTop: '0.5rem'}}>
          <b>first time user?</b> enter <b><a href="" style={{
            textDecorationLine: 'none',
            color: THEME.secondaryDarker
          }} title="Trung Nguyen">help</a></b> command in the below terminal.
        </div> */}
      </div>
    </>
  );
}

export default Header;