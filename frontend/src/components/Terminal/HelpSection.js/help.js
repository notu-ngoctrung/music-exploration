import React from 'react';

function HelpCmd() {
  return (
    <>
      <pre><br />
        <b>help</b> - Describe commands<br />
        &emsp; [...cmd]   List of commands you need to know. (empty means all) <br />
        &emsp; e.g. "help", "help suggest-me similarity"
      </pre>
    </>
  )
}

export default HelpCmd;