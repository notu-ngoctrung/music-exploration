<?php

require_once('config.php');

function if_song_exists($song, $singer) {
    global $CONFIG, $GLOBAL_DATA;
    $url = $CONFIG['spotify_api'] . '/search?q=' . urlencode($song) . '+artist:' . urlencode($singer) 
        . '&type=track'
        . '&limit=1';
    
    $headers = array(
        'Authorization: ' . $GLOBAL_DATA['spotify_authorization']
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPGET, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    curl_close($curl);
    $json_data = json_decode($response, true);

    if (!empty($json_data['error']) && $json_data['error']['status'] == 401) {
        get_new_spotify_token();
        return if_song_exists($song, $singer);
    }

    if (empty($json_data) || empty($json_data['tracks']) || empty($json_data['tracks']['items'])) {
        return null;
    }

    $track = $json_data['tracks']['items'][0];
    $singers = array();
    foreach ($track['artists'] as $artist) {
        array_push($singers, array(
            'seed' => $artist['id'],
            'name' => $artist['name'],
        ));
    }

    return array(
        'seed' => $json_data['tracks']['items'][0]['id'],
        'name' => $json_data['tracks']['items'][0]['name'],
        'singers' => $singers,
        'preview_url' => $track['preview_url'],
        'song_url' => $track['external_urls']['spotify'],
        'image_url' => $track['album']['images'][0]['url'],
        'popularity' => $track['popularity'],
        'release_date' => $track['album']['release_date'],
    );
}

function get_recommended_list($seed_track, $limit, $original_song) {
    global $CONFIG, $GLOBAL_DATA;
    $url = $CONFIG['spotify_api'] . '/recommendations?'
        . 'seed_tracks=' . $seed_track
        . '&limit=' . $limit;
        
    $headers = array(
        'Authorization: ' . $GLOBAL_DATA['spotify_authorization']
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPGET, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    curl_close($curl);
    $json_data = json_decode($response, true);

    if (!empty($json_data['error']) && $json_data['error']['status'] == 401) {
        get_new_spotify_token();
        return get_recommended_list($seed_track, $limit);
    }

    $result = array();
    foreach ($json_data['tracks'] as $track) {
        $singers = array();
        foreach ($track['artists'] as $artist) {
            array_push($singers, array(
                'seed' => $artist['id'],
                'name' => $artist['name'],
            ));
        }

        array_push($result, array(
            'seed' => $track['id'],
            'name' => $track['name'],
            'singers' => $singers,
            'preview_url' => $track['preview_url'],
            'song_url' => $track['external_urls']['spotify'],
            'image_url' => $track['album']['images'][0]['url'],
            'popularity' => $track['popularity'],
            'release_date' => $track['album']['release_date'],
        ));
    }
    
    // echo '<pre>';
    // var_dump($result);
    // echo '</pre>';

    return array(
        'original' => $original_song,
        'recommendation' => $result,
    );
}

?>