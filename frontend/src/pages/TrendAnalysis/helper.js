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

function getChartFreqVsData(songs, feature, roundOffset, multiplyOffset=1) {
  let freq = {};
  songs.forEach(e => {
    if (e['features'][feature] !== null) {
      const key = Math.floor(e['features'][feature] * multiplyOffset / roundOffset) * roundOffset;
      if (!(key in freq))
        freq[key] = 0;
      // inc by 1
      freq[key] += 1;
    }
  });
  return freq;
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

export function getTempoChartJsData(songs) {
  const tempoFreq = getChartFreqVsData(songs, 'tempo', 10);

  console.log(Object.entries(tempoFreq).map(([x, y]) => ({x: x, y: y})));

  return {
    datasets: [{
      data: Object.entries(tempoFreq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getKeyChartJsData(songs) {
  const keyFreq = getChartFreqVsData(songs, 'key', 1);

  return {
    datasets: [{
      data: Object.entries(keyFreq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getLoudnessChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'loudness', 1);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getEnergyChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'energy', 10, 100);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getDanceabilityChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'danceability', 10, 100);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getAcousticnessChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'acousticness', 0.1);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getValenceChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'valence', 0.1);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getSpeechinessChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'speechiness', 0.1);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

export function getInstrumentalnessChartJsData(songs) {
  const freq = getChartFreqVsData(songs, 'instrumentalness', 0.1);

  return {
    datasets: [{
      data: Object.entries(freq).map(([x, y]) => ({x: x, y: y})).sort((a, b) => a.x - b.x),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };
}

