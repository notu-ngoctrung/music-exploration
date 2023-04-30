/**
 * Trend Analysis:
 * - Data Source: Billboard 100
 * - Purpose: Analyze the popular music taste using statistical, concrete data
 */

import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Skeleton, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import THEME from '../../color-scheme';
import { useEffect, useState } from "react";
import Siriwave from 'react-siriwave';
import LoadingIcons from "react-loading-icons";

import './index.css';
import Analysis from "./Analysis";

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

function TrendAnalysis() {
  const [hotSongs, setHotSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_API = 'http://127.0.0.1:8080';

  // const BACKEND_API = 'http://eecslab-22.case.edu/~tnn18/music-exploration/backend';

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API}/api/billboard100-dummy.php`, {
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
      <Grid container spacing={2}>
        <Grid item md={4} xs={5} paddingLeft={2}>
          <Header />
          <Divider />
          
          <Box sx={{ px: 2 }}>
            <p><b>Note:</b> The chosen data source for trending music is <label style={{
                fontFamily: 'Arial Black',
                color: '#FFFFFF',
                backgroundColor: 'black',
                display: 'inline-block',
              }}>Billboard Hot 100</label>. This is a highly credible, well-known music ranking system among the community of music enthusiasts.</p>

            
            {
              loading ?
                ([...Array(4)].map((_, id) => <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" height={50} />
                <p></p>
              </>))
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
                  {hotSongs.map((song, id) => (
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
                        {song['song_url'] ? 
                          (<span className="hot-100-url">
                            > url: <a href={song['song_url']} target="_blank">
                              <img src="spotify.webp" height="15px" width="15px" />
                            </a>
                          </span>)
                        : (<span className="hot-100-url">
                          > url: <img src="spotify-grey.png" height="15px" width="15px" />_unavailable
                        </span>)}
                      </div>
                    </ListItem>
                  ))}
                </List>
              </>
              )
            }
          </Box>
        </Grid>
        {
            loading ? 
              (
                <Grid item md={8} xs={7} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <p>Loading data from Billboard Hot 100. It'd take a while...</p>
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
