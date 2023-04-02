import React, { useState } from 'react';


function OutputText(props) {
  return (
    <>
      <div className='output-text-wrapper'> 
        <pre>{props.text.trim()}</pre>
      </div>
    </>
  )
}

export default OutputText;