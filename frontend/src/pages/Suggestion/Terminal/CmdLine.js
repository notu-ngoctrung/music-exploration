import React, { useState } from 'react';

/**
 * Component of cmd
 */
function CmdLine(props) {
  return (
    <>
      <div className='cmdline-wrapper'> 
        <span className='cmdline-icon'>❯</span> 
        <span>{props.cmd}</span>
      </div>
    </>
  )
}

export default CmdLine;