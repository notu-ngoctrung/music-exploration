import React, { useState } from 'react';

import { TypeAnimation } from 'react-type-animation';


function OutputText(props) {
  return (
    <>
      <div className='output-text-wrapper'> 
        <pre>{props.text.trim()}</pre>
        {/* {props.typingEnabled ? (
          <TypeAnimation
            style={{ fontFamily: 'Roboto Slab', whiteSpace: 'pre-line', display: 'block' }}
            sequence={[props.text.trim(), 250, () => props.setLoading(false)]}
            cursor={false}
            repeat={0}
          />
        ) : <pre>{props.text.trim()}</pre>
        } */}
      </div>
    </>
  )
}

export default OutputText;