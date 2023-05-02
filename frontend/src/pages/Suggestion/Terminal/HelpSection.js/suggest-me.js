import React from 'react';
import THEME from '../../../../color-scheme';

function SuggestMeCmd() {
  return (
    <>
      <pre>
        <br />
        <b style={{color: THEME.secondary}}>suggest-me</b> - Recommend songs similar to a given song & singer. <i>(powered by @Spotify)</i><br />
        &emsp; --song     <b>REQUIRED</b>    Name of song<br />
        &emsp; --singer   <b>REQUIRED</b>    Name of singer. If multiple, separate them by space<br />
        &emsp; --limit    OPTIONAL    Number of suggested songs in output. (default 5, should be in [1, 50])<br />
      </pre>
    </>
  )
}

export default SuggestMeCmd;