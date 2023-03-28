import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import './index.css';

function SearchBar(props) {
  const inputFieldOnChange = (e, setState) => {
    setState(e.target.value);
    console.log(props.singer, props.song);
  };


  return (
    <>
      <Grid className='root'>
        <label className='question-label'>Suggest me 7 songs that have a similar vibe to</label>
        <TextField 
          label="Singer" variant='standard' className='text-field' 
          onChange={(e) => inputFieldOnChange(e, props.setSinger)}
        />
        <label className='question-label'>'s</label>
        <TextField 
          label='Song' variant='standard' className='text-field' 
          onChange={(e) => inputFieldOnChange(e, props.setSong)}
        />
      </Grid>
    </>
  );
}

export default SearchBar;