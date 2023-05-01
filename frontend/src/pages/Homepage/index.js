/**
 * Homepage:
 * - Purpose: An entry point for the application. User can choose either Suggestion/ Trend Analysis/ Trend Network
 */

import { useState } from 'react';
import '../../App.css';
import THEME from '../../color-scheme';
import Header from '../../components/Header';

import './index.css';
import { Button, ButtonGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: THEME.primary,
    },
    secondary: {
      main: THEME.secondaryDarker,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontFamily: 'JetBrains Mono'
    }
  }
});

function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <div className='home-container'>
        <Header />

        <p></p><p></p>
        <ButtonGroup variant="outlined" color="secondary">
          <Button onClick={() => window.open('/suggestion', '_blank')}>&gt; suggestion</Button>
          <Button onClick={() => window.open('/trend-analysis', '_blank')}>&gt; trend analysis</Button>
        </ButtonGroup>
      </div>
    </ThemeProvider>
  );
}

export default Homepage;