import React from 'react';

function AchievementCmd() {
  return (
    <>
      <pre><br />
        <b>achievement</b> - List some achievements a song has had so far.  <i>(powered by @ChatGPT)</i><br />
        {/* &emsp;            Question: "List me some fun fact about [song] by [singers]" <br/> */}
        &emsp; --id       <b>REQUIRED</b>    Song ID - taken from output of suggest-me<br />
        &emsp;            <b>        </b>              <b>0</b> refers to the original song (input of suggest-me)<br />
      </pre>
    </>
  )
}

export default AchievementCmd;