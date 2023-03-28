import { useState } from 'react';
import './App.css';
import { THEME } from './color-scheme';
import SearchBar from './SearchBar';
import { Container } from '@mui/system';

function App() {
  const [singer, setSinger] = useState('');
  const [song, setSong] = useState('');


  return (
    <Container className='app-container'>
      <SearchBar 
        singer={singer} setSinger={setSinger}
        song={song} setSong={setSong}
      />
    </Container>
  );
}

export default App;
