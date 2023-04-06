import React, { useState } from 'react';

import { TypeAnimation } from 'react-type-animation';


/**
 * Component to display text output
 */
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