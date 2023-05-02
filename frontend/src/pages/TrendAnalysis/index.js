/**
 * Trend Analysis:
 * - Data Source: Billboard 100
 * - Purpose: Analyze the popular music taste using statistical, concrete data
 */

import { Avatar, Box, Button, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import THEME from '../../color-scheme';
import { useEffect, useState } from "react";
import Siriwave from 'react-siriwave';
import LoadingIcons from "react-loading-icons";
import HelpIcon from '@mui/icons-material/Help';

import './index.css';
import Analysis from "./Analysis";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from "react-chartjs-2";
import HelpTab from "./HelpTab";

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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function TrendAnalysis() {
  const [hotSongs, setHotSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [helpTabOpen, setHelpTabOpen] = useState(false);

  const [analyzedSongId, setAnalyzedSongId] = useState(-1);

  const BACKEND_API = 'http://127.0.0.1:8080';

  // const BACKEND_API = 'http://eecslab-22.case.edu/~tnn18/music-exploration/backend';

  const switchAnalyzedSongId = (id) => {
    setAnalyzedSongId(curId => {
      if (id === curId)
        return -1;
      return id;
    });
  };

  const getFeaturesRadarData = (song, ...featureNames) => {
    const result = [];
    featureNames.forEach(e => result.push(song['features'][e]));
    return result;
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API}/api/billboard100.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode':'no-cors',
      },
    })
    .then(res => {
      if (res.ok)
        return res.json();
      return new Error('Backend is busy. Please try again!');
    })
    .then(data => {
      setHotSongs(data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HelpTab
        open={helpTabOpen}
        closeFunc={() => setHelpTabOpen(false)}
      />
      <Grid container spacing={2}>
        <Grid item md={4} xs={5} paddingLeft={2}>
          <Header />
          <Divider />
          
          <Box sx={{ px: 2 }}>
            <p>
              <b>NEWBIE? CLICK</b>
              <IconButton onClick={() => setHelpTabOpen(true)}>
                <HelpIcon />
              </IconButton>
              <b>TO LEARN!</b>
            </p>
            <p>
              Note: The chosen data source for trending music is <label style={{
                fontFamily: 'Arial Black',
                color: '#FFFFFF',
                backgroundColor: 'black',
                display: 'inline-block',
              }}>Billboard Hot 100</label> and <div class="spotify-logo">
                <span class="spotify-text">Spotify</span>
              </div>
            </p>

            
            {
              loading ?
              (
                <List
                  sx={{
                    width: '100%',
                    // bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: `calc(100vh - 18em)`,
                  }}
                >
                {[...Array(10)].map((_, id) => <>
                <Skeleton variant="circular" width={40} height={60} />
                <Skeleton variant="rectangular" height={50} />
                <p></p><br />
              </>)}
                </List>
              )
              : (
              <>
                <List
                  sx={{
                    width: '100%',
                    // bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: `calc(100vh - 18em)`,
                  }}
                >
                  {hotSongs.map((song, id) => (<>
                    <ListItem alignItems="flex-start center">
                      <div className="hot-100-ranking">{id + 1}</div>
                      <ListItemAvatar>
                        <Avatar
                          src={song['image_url']}
                          sx={{ width: 80, height: 80 }}
                          variant="square"
                        />
                      </ListItemAvatar>
                      <div className="hot-100-item-info">
                        <span className="hot-100-song-name">{song['name']}</span> <br/>
                        <span className="hot-100-singer-name">{song['singers'].map(s => s['name']).join(', ')}</span> <br/>
                        <button className="hot-100-singer-name hot-100-expand-button" onClick={() => switchAnalyzedSongId(id)}>
                          {id !== analyzedSongId ? 'click to analyze' : 'close'}
                        </button> <br/>
                      </div>
                    </ListItem>
                    <Collapse in={id === analyzedSongId}>
                      {id === analyzedSongId && (
                        <>
                          {song['song_url'] ? 
                            (<span className="hot-100-url hot-100-item-detail">
                              > <b>url</b>: <a href={song['song_url']} target="_blank">
                                <img src="spotify.webp" height="15px" width="15px" />
                              </a>
                            </span>)
                          : (<span className="hot-100-url hot-100-item-detail">
                            &gt; <b>url</b>: <img src="spotify-grey.png" height="15px" width="15px" />_unavailable
                          </span>)} <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>name</b>: {song['name']}
                          </span> <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>singers</b>: {song['singers'].map(s => s['name']).join(', ')}
                          </span> <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>spotify popularity</b>: {song['popularity']}
                          </span> <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>song key</b>: {song['features']['key']} <a href="https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/" target="_blank">(integer notation)</a>
                          </span> <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>tempo</b>: {song['features']['tempo']} BPM
                          </span> <br />
                          <span className="hot-100-item-detail">
                            &gt; <b>loudness</b>: {song['features']['loudness']} dB
                          </span> <br />
                          <span className="hot-100-item-detail">
                            <i>note: in the chart below, all data is in 0.0 to 1.0 (or 0% to 100%)</i>
                          </span> <br />
                          <Radar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  display: false
                                },
                              },
                            }}
                            data={{
                              labels: ['Energy', 'Danceability', 'Acousticness', 'Valence', 'Speechiness', 'Instrumentalness'],
                              datasets: [
                                {
                                  data: getFeaturesRadarData(song, 'energy', 'danceability', 'acousticness', 'valence', 'speechiness', 'instrumentalness'),
                                  backgroundColor: 'rgba(75, 192, 192, 0.3)',
                                  borderColor: 'rgb(75, 192, 192)',
                                },
                              ],
                            }}
                          />
                        </>
                      )}
                    </Collapse>
                  </>))}
                </List>
              </>
              )
            }
          </Box>
        </Grid>
        {
            loading ? 
              (
                <Grid item md={8} xs={7} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                  <p>Loading data from Billboard Hot 100 & Spotify. <br/>It'd take <b>1-2 minutes</b>...</p>
                  <LoadingIcons.Grid
                    height="3em"
                    fill={THEME.secondaryDarker}
                  />
                </Grid>
              )
            : (
              <Grid item md={8} xs={7}>
                <Analysis songs={hotSongs} />
              </Grid>
            )
          }
      </Grid>
    </ThemeProvider>
  );
}

export default TrendAnalysis;
