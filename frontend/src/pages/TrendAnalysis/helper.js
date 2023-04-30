function calculateAvgNumeric(songs, feature) {
  let numSongs = 0;
  let totalFeature = 0;
  songs.forEach(e => {
    if (e['features'][feature] !== null) {
      totalFeature += e['features'][feature];
      numSongs += 1;
    }
  });

  return (totalFeature / numSongs);
}

export function calculateMostUsedKey(songs) {
  const keys = {};
  let mostFreq = 0;
  let result = new Set();
  songs.forEach(e => {
    if (!(e['features']['key'] in keys))
      keys[e['features']['key']] = 0;
    keys[e['features']['key']] += 1;
    
    if (keys[e['features']['key']] > mostFreq) {
      mostFreq = keys[e['features']['key']];
      result.clear();
    }
    if (keys[e['features']['key']] === mostFreq) {
      result.add(e['features']['key']);
    }
  });

  const arrresult = Array.from(result).sort((a, b) => a - b);
  return arrresult;
}

export function calculateAvgTempo(songs) {
  return calculateAvgNumeric(songs, 'tempo').toFixed(2);
}

export function calculateAvgEnergy(songs) {
  return (calculateAvgNumeric(songs, 'energy') * 100).toFixed(2);
}

export function calculateAvgDanceability(songs) {
  return (calculateAvgNumeric(songs, 'danceability') * 100).toFixed(2);
}

export function calculateAvgAcousticness(songs) {
  return (calculateAvgNumeric(songs, 'acousticness')).toFixed(2);
}

export function calculateAvgValence(songs) {
  return (calculateAvgNumeric(songs, 'valence')).toFixed(2);
}

export function calculateAvgSpeechiness(songs) {
  return (calculateAvgNumeric(songs, 'speechiness')).toFixed(2);
}

export function calculateAvgInstrumentalness(songs) {
  return (calculateAvgNumeric(songs, 'instrumentalness')).toFixed(2);
}

export function calculateAvgLoudness(songs) {
  return (calculateAvgNumeric(songs, 'loudness')).toFixed(2);
}