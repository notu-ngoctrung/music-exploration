import { useState } from 'react';
import './App.css';
import THEME from './color-scheme.js';
import { Container } from '@mui/system';
import Header from './components/Header';
// import "react-animated-term/dist/react-animated-term.css";
import Terminal from './components/Terminal';

function App() {
  const BACKEND_API = 'http://127.0.0.1:8000';


  const [history, setHistory] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentCmd, setCurrentCmd] = useState('');

  const [loading, setLoading] = useState(false);

  const printInvalidCmd = (invalid) => {
    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-text',
        content: invalid,
      });
      return newHist;
    });
  }

  const handleSuggestMe = (args) => {
    let song = null;
    let singer = null;
    // let queryNum = 10;

    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] == 'song') 
        song = contentParts.slice(1).join(' ').trim();
      else if (contentParts[0] == 'singer') 
        singer = contentParts.slice(1).join(' ').trim();
    });

    if (song == null || singer == null) {
      printInvalidCmd('Invalid command. Cannot recognize song / singer.');
      return;
    }

    // suggest-me --singer Taylor --song You belong to me

    fetch(BACKEND_API + '/api/recommendation.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
      body: JSON.stringify({
        'singer': singer,
        'song': song
      })
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Backend is busy. Please try again!');
      return res.json();
    })
    .then(data => {
      const originalSong = data['original'];
      const recommendations = data['recommendation'];

      setSongs([originalSong, ...recommendations]);
      setHistory(hist => {
        const newHist = [...hist];
        newHist.push({
          type: 'output-songs',
          content: recommendations
        });
        return newHist;
      });

      setLoading(false);
    })
    .catch(err => {
      printInvalidCmd(err.message);
      setLoading(false);
    })
  };

  const handlePreview = (args) => {

  }

  const handleFunFact = (args) => {

  }

  const handleAchievement = (args) => {

  }

  const handleSimilarity = (args) => {

  }

  const handleCmdSubmit = (cmd) => {
    setLoading(true);

    const args = cmd.split('--').map(ar => ar.trim());
    if (args.length == 0) {
      printInvalidCmd('Invalid command. No command submitted');
      setLoading(false);
      return;
    }

    const argsContent = args.slice(1);

    switch (args[0]) {
      case 'suggest-me':
        setHistory([{
          type: 'cmd',
          content: cmd
        }]);
        setSongs([]);
        handleSuggestMe(argsContent);
        break;
      case 'preview':
        handlePreview(argsContent);
        break;
      case 'fun-fact':
        handleFunFact(argsContent);
        break;
      case 'achievement':
        handleAchievement(argsContent);
        break;
      case 'similarity':
        handleSimilarity(argsContent);
        break;
      default:
        printInvalidCmd('Invalid command. No command type found');
        setLoading(false);
        break;
    }
  };

  return (
    <>
      <Header />
      <Terminal
        history={history}
        setHistory={setHistory}
        songs={songs}
        setSongs={setSongs}
        currentCmd={currentCmd}
        setCurrentCmd={setCurrentCmd}
        loading={loading}
        setLoading={setLoading}

        handleCmdSubmit={handleCmdSubmit}
      />
    </>
  );
}

export default App;
