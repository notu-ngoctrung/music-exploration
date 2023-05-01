import { Box, Grid, Typography } from "@mui/material";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import * as helper from './helper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

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
        maxHeight: '100vh',
        bgcolor: 'background.paper',
        borderRadius: '1em',
        textAlign: 'center',
        padding: '1em 0em 1em 0em'
      }}
    >
      <h1>song features</h1>
      <p></p>

      <Grid container spacing={2}>
        {/* Tempo */}
        <Grid item xs={4}>
          <h2>TEMPO</h2>
          <span>average: {helper.calculateAvgTempo(props.songs)} BPM</span>

          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']}-${parseInt(ctx[0]['label'])+10} BPM`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    stepSize: 10,
                  },
                  title: {
                    text: 'Tempo (flooring to nearest ten) (BPM)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getTempoChartJsData(props.songs)}
          />
        </Grid>
        {/* Key */}
        <Grid item xs={4}>
          <h2>KEY</h2>
          <span>most used key: {helper.calculateMostUsedKey(props.songs)} <a href="https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/" target="_blank">(integer notation)</a></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0,
                  max: 11,
                  ticks: {
                    stepSize: 1,
                  },
                  title: {
                    text: 'Song Key (integer notation)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getKeyChartJsData(props.songs)}
          />
        </Grid>
        {/* Loudness */}
        <Grid item xs={4}>
          <h2>LOUDNESS</h2>
          <span>mean: {helper.calculateAvgLoudness(props.songs)} dB</span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} to <${parseInt(ctx[0]['label'])+1} dB`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    stepSize: 1,
                  },
                  title: {
                    text: 'Loudness (flooring to nearest integer) dB',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getLoudnessChartJsData(props.songs)}
          />
        </Grid>
        {/* Energy */}
        <Grid item xs={4}>
          <h2>ENERGY</h2>
          <span>%average: {helper.calculateAvgEnergy(props.songs)}</span> <br/>
          <span><i>closer to 100% &lt;=&gt; more energetic vibe.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} - ${parseInt(ctx[0]['label'])+10} %`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 10,
                  },
                  title: {
                    text: 'Energy (flooring to nearest ten) (%)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getEnergyChartJsData(props.songs)}
          />
        </Grid>
        {/* Danceability */}
        <Grid item xs={4}>
          <h2>DANCEABILITY</h2>
          <span>%average: {helper.calculateAvgDanceability(props.songs)}</span> <br/>
          <span><i>closer to 100% &lt;=&gt; more suitable for dance.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} to <${parseInt(ctx[0]['label'])+10} %`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                  title: {
                    text: 'Danceability (flooring to nearest ten) (%)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getDanceabilityChartJsData(props.songs)}
          />
        </Grid>
        {/* Acousticness */}
        <Grid item xs={4}>
          <h2>ACOUSTICNESS</h2>
          <span>mean: {helper.calculateAvgAcousticness(props.songs)}</span> <br/>
          <span><i>closer to 1 &lt;=&gt; songs are acoustic.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} to <${(parseFloat(ctx[0]['label'])+0.1).toFixed(1)}`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0.0,
                  max: 1.0,
                  ticks: {
                    stepSize: 0.1,
                  },
                  title: {
                    text: 'Acousticness (flooring to 1 decimal)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getAcousticnessChartJsData(props.songs)}
          />
        </Grid>
        {/* Valence */}
        <Grid item xs={4}>
          <h2>VALENCE</h2>
          <span>mean: {helper.calculateAvgValence(props.songs)}</span> <br/>
          <span><i>closer to 1 &lt;=&gt; more positive vibes.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} to <${(parseFloat(ctx[0]['label'])+0.1).toFixed(1)}`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0.0,
                  max: 1.0,
                  ticks: {
                    stepSize: 0.1,
                  },
                  title: {
                    text: 'Valence (flooring to 1 decimal)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getValenceChartJsData(props.songs)}
          />
        </Grid>
        {/* Speechiness */}
        <Grid item xs={4}>
          <h2>SPEECHINESS</h2>
          <span>mean: {helper.calculateAvgSpeechiness(props.songs)}</span> <br/>
          <span><i>closer to 1.0 &lt;=&gt; songs contain many words.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0.0,
                  max: 1.0,
                  ticks: {
                    stepSize: 0.1,
                  },
                  title: {
                    text: 'Speechiness (flooring to 1 decimal)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getSpeechinessChartJsData(props.songs)}
          />
        </Grid>
        {/* Instrumentalness */}
        <Grid item xs={4}>
          <h2>INSTRUMENTALNESS</h2>
          <span>mean: {helper.calculateAvgInstrumentalness(props.songs)}</span> <br/>
          <span><i>1.0 &lt;=&gt; songs are instrumental.</i></span><br/>
          <span><i>0.0 &lt;=&gt; songs are vocal.</i></span>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (ctx) => `${ctx[0]['label']} to <${(parseFloat(ctx[0]['label'])+0.1).toFixed(1)}`,
                    afterLabel: () => 'song(s)',
                  }
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  },
                  beginAtZero: true,
                  title: {
                    text: 'Number of Songs',
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      title: (ctx) => `${ctx[0]['label']} to <${(parseFloat(ctx[0]['label'])+0.1).toFixed(1)}`,
                      afterLabel: () => 'song(s)',
                    }
                  },
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  min: 0.0,
                  max: 1.0,
                  ticks: {
                    stepSize: 0.1,
                  },
                  title: {
                    text: 'Instrumentalness (flooring to 1 decimal)',
                    display: true,
                  }
                }
              },
            }}
            data={helper.getInstrumentalnessChartJsData(props.songs)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;