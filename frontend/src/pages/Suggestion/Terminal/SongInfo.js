import { Radar } from "react-chartjs-2";

function SongInfo(props) {
  const getFeaturesRadarData = (song, ...featureNames) => {
    const result = [];
    featureNames.forEach(e => result.push(song['features'][e]));
    return result;
  };

  return (
    <>
    <div className='displaysong-wrapper'>
      <img style={{
        height: '15rem',
        width: '15rem',
        alignSelf: 'center'

      }} src={props.song['image_url']} />
      <div className='displaysong-info'>
        <span><span className='displaysong-info-title'>song: </span>{props.song['name']}</span> <br />
        <span><span className='displaysong-info-title'>singer(s): </span> {props.song['singers'].map(s => s['name']).join(', ')}</span> <br />
        <span className='displaysong-info-title'>spotify url: </span> <a className="displaysong-spotify-url" target={'_blank'} href={props.song['song_url']}>{props.song['song_url']}</a> <br />
        <span><span className='displaysong-info-title'>release date: </span> {props.song['release_date']}</span> <br />
        <span><span className='displaysong-info-title'>spotify popularity: </span> {props.song['popularity']}</span> <br />
        <span>-----------features-----------</span> <br />
        <span><span className='displaysong-info-title'>song key: </span>{props.song['features']['key']} <a className="displaysong-spotify-url" href="https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/" target="_blank">(integer notation)</a></span> <br />
        <span><span className='displaysong-info-title'>tempo: </span> {props.song['features']['tempo']}</span> BPM (beat-per-minute) <br />
        <span><span className='displaysong-info-title'>loudness: </span> {props.song['features']['loudness']}</span> dB <br />
      </div>
    </div>
        <div style={{
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Radar
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
            },
            scales: {
              r: {
                min: 0.0,
                max: 1.0,
                angleLines: {
                  color: 'white'
                },
                grid: {
                  color: 'grey'
                },
                pointLabels: {
                  color: 'white'
                }
              }
            }
          }}
          data={{
            labels: ['Energy', 'Danceability', 'Acousticness', 'Valence', 'Speechiness', 'Instrumentalness'],
            datasets: [
              {
                data: getFeaturesRadarData(props.song, 'energy', 'danceability', 'acousticness', 'valence', 'speechiness', 'instrumentalness'),
                backgroundColor: 'rgba(75, 192, 192, 0.3)',
                borderColor: 'rgb(75, 192, 192)',
              },
            ],
          }}
        />
        </div>
    </>
  );
}

export default SongInfo;