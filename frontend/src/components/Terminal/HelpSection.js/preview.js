import React from 'react';
import THEME from '../../../color-scheme';

function PreviewCmd() {
  return (
    <>
      <pre><br />
        <b style={{color: THEME.secondary}}>preview</b> - Play a preview of a song<br />
        &emsp; --id       <b>REQUIRED</b>    Song ID - taken from output of suggest-me<br />
        &emsp;            <b>        </b>              <b>0</b> refers to the original song (input of suggest-me)<br />
      </pre>
    </>
  )
}

export default PreviewCmd;