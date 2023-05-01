import { Accordion, AccordionDetails, AccordionSummary, Drawer, Grid } from "@mui/material";

import THEME from '../../color-scheme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './index.css';


function HelpTab({open, closeFunc}) {
  return (<>
    <Drawer
      anchor="right"
      open={open}
      onClose={closeFunc}
      
    >
      <div style={{
        width: '35vw',
        padding: '0em 0em 0em 1.5em',
      }}>
        <h2>Welcome to  <b><label style={{ color: THEME.secondaryDarker }}>> trend&nbsp;</label>analysis&nbsp; </b></h2>
        <p>
          The purpose of <b><label style={{ color: THEME.secondaryDarker }}>> trend&nbsp;</label>analysis</b> is to let users know insights into the statistical characteristics of current trending songs. <br />
        </p>
        <p>
          In order to define whether a song is on trending, the page relies on Billboard Hot 100.
          Then, the song insight is crawled from Spotify. <br />
        </p>

        There are 9 features we care about. Please click on the feature you want to learn more to learn! <br />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Tempo
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
              The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Key
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
              The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.
            </span>
            <ol>
              <li>C (B♯, etc.)</li>
              <li>C♯, D♭</li>
              <li>D (C𝄪, etc.)</li>
              <li>D♯, E♭</li>
              <li>E (F♭, etc.)</li>
              <li>F (E♯, etc.)</li>
              <li>F♯, G♭</li>
              <li>G (F𝄪, etc.)</li>
              <li>G♯, A♭</li>
              <li>A (G𝄪, etc.)</li>
              <li>A♯, B♭</li>
              <li>B (C♭, etc.)</li>
            </ol>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Loudness
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Energy
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Danceability
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Acousticness
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Valence / Positivity
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Speechiness
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
            </span>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Instrumentalness
          </AccordionSummary>
          <AccordionDetails>
            <span className="helptab-item-detail">
            Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
            </span>
          </AccordionDetails>
        </Accordion>
      </div>
    </Drawer>
  </>);
}

export default HelpTab;