import { useState } from 'react';
import './App.css';
import THEME from './color-scheme.js';
import { Container } from '@mui/system';
import Header from './components/Header';
// import "react-animated-term/dist/react-animated-term.css";
import Terminal from './components/Terminal';
import * as helperFF from './helper/funFact';
import * as helperPreview from './helper/audioPreview';

function App() {
  // const BACKEND_API = 'http://127.0.0.1:8000';

  // const BACKEND_API = 'https://eecslab-22.case.edu/~tnn18/music-exploration/backend';

  const BACKEND_API = '';

  const [history, setHistory] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentCmd, setCurrentCmd] = useState('');
  const [audioPreview, setAudioPreview] = useState({
    enabled: false,
    url: null,
  });

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
    let queryNum = '5';

    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] === 'song') 
        song = contentParts.slice(1).join(' ').trim();
      else if (contentParts[0] === 'singer') 
        singer = contentParts.slice(1).join(' ').trim();
      else if (contentParts[0] === 'limit')
        queryNum = contentParts.slice(1).join(' ').trim();
    });

    if (song == null || singer == null || isNaN(parseInt(queryNum))) {
      printInvalidCmd('Invalid command. Cannot recognize song / singer.');
      setLoading(false);
      return;
    }

    queryNum = parseInt(queryNum);

    if (queryNum > 50 || queryNum < 1) {
      printInvalidCmd('`limit` should be in [1, 50]');
      setLoading(false);
      return;
    }

    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-text',
        content: 'Let\'s hear what Spotify recommends'
      });
      return newHist;
    });

    fetch(BACKEND_API + '/api/recommendation.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
      body: JSON.stringify({
        'singer': singer,
        'song': song,
        'limit': queryNum,
      })
    })
    .then(res => {
      // console.log(BACKEND_API + '/api/recommendation.php');
      // console.log(res);
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
    let id = null;
    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] === 'id')
        id = contentParts.slice(1).join(' ').trim();
    });

    if (isNaN(parseInt(id))) {
      printInvalidCmd('Invalid command. Cannot recognize --id.');
      setLoading(false);
      return;
    }

    id = parseInt(id);

    if (!helperFF.validSongId(id, songs.length)) {
      printInvalidCmd('--id is out of bound. Please revise!');
      setLoading(false);
      return;
    }

    if (!helperPreview.songPreviewable(songs[id])) {
      printInvalidCmd(`Preview is currently not available due to copyright :(\nPlease directly listen to the song @ ${songs[id]['song_url']}`);
      setLoading(false);
      return;
    }

    printInvalidCmd(`Previewing ${songs[id]['name']} by ${songs[id]['singers'].map(e => e['name']).join(', ')}`)
    setAudioPreview({
      enabled: true,
      url: songs[id]['preview_url']
    });

    setLoading(false);
  }

  const handleSimilarity = (args) => {
    let firstId = null;
    let secondId = null;
    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] === 'first')
        firstId = contentParts.slice(1).join(' ').trim();
      else if (contentParts[0] === 'second')
        secondId = contentParts.slice(1).join(' ').trim();
    });

    if (isNaN(parseInt(firstId)) || isNaN(parseInt(secondId))) {
      printInvalidCmd('Invalid command. Either first or second cannot be recognized.');
      setLoading(false);
      return;
    }

    firstId = parseInt(firstId);
    secondId = parseInt(secondId);

    if (!helperFF.validSongId(firstId, songs.length) || !helperFF.validSongId(secondId, songs.length)) {
      printInvalidCmd('Invalid command. The index of either first and/or second is out of bound.');
      setLoading(false);
      return;
    }

    if (secondId === firstId) {
      printInvalidCmd('--first and --second must be different.');
      setLoading(false);
      return;
    }

    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-text',
        content: 'Asking our friend ChatGPT... \nNote: Please remember that ChatGPT might not have information about songs released after cutoff date (09/2021).'
      });
      return newHist;
    });

    const firstSong = {
      'name': songs[firstId].name,
      'singer': songs[firstId]['singers'].map(s => s['name']).join(', ').trim(),
    };
    const secondSong = {
      'name': songs[secondId].name,
      'singer': songs[secondId]['singers'].map(s => s['name']).join(', ').trim(),
    };

    fetch(BACKEND_API + '/api/similarity.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
      body: JSON.stringify({
        'orginalSong': firstSong,
        'suggestedSong': secondSong,
      })
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Backend is busy. Please try again!');
      return res.json();
    })
    .then(data => {
      setHistory(hist => {
        const newHist = [...hist];
        newHist.push({
          type: 'output-text',
          content: data.replaceAll('\n\n', '\n'),
          typingEnabled: true,
        });
        return newHist;
      });
      setLoading(false);
    })
    .catch(err => {
      printInvalidCmd(err.message);
      setLoading(false);
    })
  }

  const handleAchievement = (args) => {
    let id = null;
    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] === 'id')
        id = contentParts.slice(1).join(' ').trim();
    });
    if (isNaN(parseInt(id))) {
      printInvalidCmd('Invalid command. Id cannot be recognized.');
      setLoading(false);
      return;
    }

    id = parseInt(id);
    if (!helperFF.validSongId(id, songs.length)) {
      printInvalidCmd('Invalid command. The index of either first and/or second is out of bound.');
      setLoading(false);
      return;
    }

    const song = {
      'song': songs[id].name,
      'singer': songs[id]['singers'].map(s => s['name']).join(', ').trim(),
    };

    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-text',
        content: 'Asking our friend ChatGPT... \nNote: Please remember that ChatGPT might not have information about songs released after cutoff date (09/2021).'
      });
      return newHist;
    });

    fetch(BACKEND_API + '/api/achievement.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
      body: JSON.stringify(song)
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Backend is busy. Please try again!');
      return res.json();
    })
    .then(data => {
      setHistory(hist => {
        const newHist = [...hist];
        newHist.push({
          type: 'output-text',
          content: data.replaceAll('\n\n', '\n'),
          typingEnabled: true,
        });
        return newHist;
      });
      setLoading(false);
    })
    .catch(err => {
      printInvalidCmd(err.message);
      setLoading(false);
    })
  }

  const handleFunFact = (args) => {
    let id = null;
    args.forEach(arg => {
      const contentParts = arg.split(' ');
      if (contentParts[0] === 'id')
        id = contentParts.slice(1).join(' ').trim();
    });
    if (isNaN(parseInt(id))) {
      printInvalidCmd('Invalid command. Id cannot be recognized.');
      setLoading(false);
      return;
    }

    id = parseInt(id);
    if (!helperFF.validSongId(id, songs.length)) {
      printInvalidCmd('Invalid command. The index of either first and/or second is out of bound.');
      setLoading(false);
      return;
    }

    const song = {
      'song': songs[id].name,
      'singer': songs[id]['singers'].map(s => s['name']).join(', ').trim(),
    };

    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-text',
        content: 'Asking our friend ChatGPT... \nNote: Please remember that ChatGPT might not have information about songs released after cutoff date (09/2021).'
      });
      return newHist;
    });

    fetch(BACKEND_API + '/api/funfact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
      body: JSON.stringify(song)
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Backend is busy. Please try again!');
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      setHistory(hist => {
        const newHist = [...hist];
        newHist.push({
          type: 'output-text',
          content: data.replaceAll('\n\n', '\n'),
          typingEnabled: true,
        });
        return newHist;
      });
      setLoading(false);
    })
    .catch(err => {
      printInvalidCmd(err.message);
      setLoading(false);
    })
  }

  const handleHelp = (args) => {
    const cmds = (args !== undefined ? args : []);
    // console.log(args)
    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'help',
        content: cmds
      })
      return newHist
    });
    setLoading(false);
  }

  const handleCmdSubmit = (cmd) => {
    setLoading(true);
    setAudioPreview(preview => ({
      ...preview,
      enabled: false,
    }));

    console.log(cmd.split('--'));

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
        if (args[0].includes('help')) {
          handleHelp(args[0].split(' ').slice(1));
          return;
        }
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
        audioPreview={audioPreview}
        setAudioPreview={setAudioPreview}

        handleCmdSubmit={handleCmdSubmit}
      />
    </>
  );
}

export default App;
