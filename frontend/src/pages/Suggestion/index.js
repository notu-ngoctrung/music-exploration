import { Accordion, AccordionDetails, AccordionSummary, Grid, ThemeProvider, createTheme } from "@mui/material";
import { useState } from 'react';

import Header from './Header';
import Terminal from './Terminal';

import THEME from '../../color-scheme';

import * as helperFF from './helper/funFact';
import * as helperPreview from './helper/audioPreview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const theme = createTheme({
  palette: {
    primary: {
      main: THEME.primary,
    },
    secondary: {
      main: THEME.secondaryDarker,
    },
  },
});

function Suggestion() {
  const BACKEND_API = 'http://127.0.0.1:8080';

  // const BACKEND_API = 'http://eecslab-22.case.edu/~tnn18/music-exploration/backend';

  const [history, setHistory] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentCmd, setCurrentCmd] = useState('');
  const [audioPreview, setAudioPreview] = useState({
    enabled: false,
    url: null,
  });

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState('-1');

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
    let queryNum = '10';

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
      if (res.ok)
        return res.json();
      if (res.status == 400)
        throw new Error('No song is found with the given input. Please revise your input.')
      throw new Error('Backend is busy. Please try again!');
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

  const handleInfo = (args) => {
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

    setHistory(hist => {
      const newHist = [...hist];
      newHist.push({
        type: 'output-info',
        content: songs[id]
      });
      return newHist;
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
      case 'info':
        handleInfo(argsContent);
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item height="100vh" xs={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
          <Header />
          <div id="powered">
            powered by <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" /> 
            // <img  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" />
          </div>
          <div style={{marginTop: '0.5rem'}}>
            <b>first time user?</b> enter <b><a href="" style={{
              textDecorationLine: 'none',
              color: THEME.secondaryDarker
            }} title="Trung Nguyen">help</a></b> command in the right terminal.
          </div>

          <div style={{
            width: '100%',
            textAlign: 'left'
          }}>
            <Accordion expanded={expanded === '1'} onChange={handleAccordionChange('1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                suggest-me
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                Recommend songs similar to a given song & singer. (powered by @Spotify)
                <br />
                example: 
                </span> <br/>
                <span className="helptab-item-detail helptab-item-detail-code">
                  suggest-me --song Hello --singer Adele
                </span> <br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  suggest-me --limit 10 --song Hello --singer Adele
                </span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '2'} onChange={handleAccordionChange('2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                preview
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Play a preview of a song                <br />
                example: 
                </span><br/>
                <span className="helptab-item-detail helptab-item-detail-code">
                  preview --id 0
                </span> <span className="helptab-item-detail">(original song)</span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  preview --id 1
                </span> <span className="helptab-item-detail">(first song in the recommended list)</span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '3'} onChange={handleAccordionChange('3')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                info
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Get information and detailed features of the song. (powered by @Spotify)<br />
                example: 
                </span><br/>
                <span className="helptab-item-detail helptab-item-detail-code">
                  info --id 0
                </span> <span className="helptab-item-detail">(original song)</span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  info --id 1
                </span> <span className="helptab-item-detail">(first song in the recommended list)</span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '4'} onChange={handleAccordionChange('4')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                achievement
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Ask ChatGPT to list some achievements a song has had so far.
                  <br /> example:
                </span> <br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  achievement --id 0
                </span> <span className="helptab-item-detail">(original song)</span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  achievement --id 1
                </span> <span className="helptab-item-detail">(first song in the recommended list)</span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '5'} onChange={handleAccordionChange('5')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                fun-fact
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Ask ChatGPT to list some fun facts a song has.
                  <br /> example:
                </span> <br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  fun-fact --id 0
                </span> <span className="helptab-item-detail">(original song)</span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  fun-fact --id 1
                </span> <span className="helptab-item-detail">(first song in the recommended list)</span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '6'} onChange={handleAccordionChange('6')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                similarity
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Ask ChatGPT to clarify the similarity between 2 songs.
                  <br /> example:
                </span>  <br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  similarity --first 0 --second 1
                </span> <span className="helptab-item-detail">(original song and 1st song in the recommended list)</span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                similarity --first 1 --second 2
                </span> <span className="helptab-item-detail">(1st song and 2nd song in the recommended list)</span> <br />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === '7'} onChange={handleAccordionChange('7')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                help
              </AccordionSummary>
              <AccordionDetails>
                <span className="helptab-item-detail">
                  Describe commands.
                  <br /> example:
                </span>  <br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  help
                </span><br />
                <span className="helptab-item-detail helptab-item-detail-code">
                  help suggest-me preview
                </span> <br />
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
        <Grid item xs={8} height="100vh" padding={0}>
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Suggestion;