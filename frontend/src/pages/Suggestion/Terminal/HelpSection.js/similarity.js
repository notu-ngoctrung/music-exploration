import React from 'react';
import THEME from '../../../../color-scheme';

function SimilarityCmd() {
  return (
    <>
      <pre><br />
        <b style={{color: THEME.secondary}}>similarity</b> - Clarify the similarity between 2 songs.           <i>(powered by @ChatGPT)</i><br />
        {/* &emsp;            Question: "List me some fun fact about [song] by [singers]" <br/> */}
        &emsp; --first    <b>REQUIRED</b>    Song ID - taken from output of suggest-me<br />
        &emsp;            <b>        </b>              <b>0</b> refers to the original song (input of suggest-me)<br />
        &emsp; --second   <b>REQUIRED</b>    Song ID - taken from output of suggest-me (must be !== --first)<br />
      </pre>
    </>
  )
}

export default SimilarityCmd;