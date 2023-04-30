import { Box, Grid, Typography } from "@mui/material";

import * as helper from './helper';

/**
 * 9 charts:
 * - Tempo
 * - Key
 * - Energy
 * - Danceability
 * - Acousticness
 * - Valence
 * - Speechiness
 * - Instrumentalness
 * - Loudness
 */
function Analysis(props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        bgcolor: 'background.paper',
        borderRadius: '1em',
        textAlign: 'center'
      }}
    >
      <h1>song features</h1>
      <p></p>

      <Grid container spacing={2}>
        {/* Tempo */}
        <Grid item xs={4}>
          <h2>TEMPO</h2>
          <span>average: {helper.calculateAvgTempo(props.songs)} BPM</span>
        </Grid>
        {/* Key */}
        <Grid item xs={4}>
          <h2>KEY</h2>
          <span>most used key: {helper.calculateMostUsedKey(props.songs)} <a href="https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/" target="_blank">(integer notation)</a></span>
        </Grid>
        {/* Loudness */}
        <Grid item xs={4}>
          <h2>LOUDNESS</h2>
          <span>mean: {helper.calculateAvgLoudness(props.songs)} dB</span>
        </Grid>
        {/* Energy */}
        <Grid item xs={4}>
          <h2>ENERGY</h2>
          <span>%average: {helper.calculateAvgEnergy(props.songs)}</span> <br/>
          <span><i>closer to 100% &lt;=&gt; a faster, louder vibe.</i></span>
        </Grid>
        {/* Danceability */}
        <Grid item xs={4}>
          <h2>DANCEABILITY</h2>
          <span>%average: {helper.calculateAvgDanceability(props.songs)}</span> <br/>
          <span><i>closer to 100% &lt;=&gt; songs are suitable for dance.</i></span>
        </Grid>
        {/* Acousticness */}
        <Grid item xs={4}>
          <h2>ACOUSTICNESS</h2>
          <span>mean: {helper.calculateAvgAcousticness(props.songs)}</span> <br/>
          <span><i>closer to 1 &lt;=&gt; songs are acoustic.</i></span>
        </Grid>
        {/* Valence */}
        <Grid item xs={4}>
          <h2>VALENCE</h2>
          <span>mean: {helper.calculateAvgValence(props.songs)}</span> <br/>
          <span><i>closer to 1.0 &lt;=&gt; positive vibes.</i></span>
        </Grid>
        {/* Speechiness */}
        <Grid item xs={4}>
          <h2>SPEECHINESS</h2>
          <span>mean: {helper.calculateAvgSpeechiness(props.songs)}</span> <br/>
          <span><i>closer to 1.0 &lt;=&gt; songs contain many words.</i></span>
        </Grid>
        {/* Instrumentalness */}
        <Grid item xs={4}>
          <h2>INSTRUMENTALNESS</h2>
          <span>mean: {helper.calculateAvgInstrumentalness(props.songs)}</span> <br/>
          <span><i>1.0 &lt;=&gt; songs are instrumental.</i></span><br/>
          <span><i>0.0 &lt;=&gt; songs are vocal.</i></span>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;