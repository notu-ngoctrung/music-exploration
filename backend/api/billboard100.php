<?php
require_once('../helper/billboard.php');
require_once('../helper/spotify.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $top_100 = get_top_100();

    $result = array();

    $track_ids = array();

    header('Content-Type: application/json');
    foreach ($top_100 as $track) {
        // Full details
        $song = if_song_exists($track['title'], $track['singers']);
        $singer_split_by_space = explode(' ', $track['singers']);

        // 1. If not found, try search for first & last singer name
        if (empty($song['seed'])) 
            $song = if_song_exists($track['title'], $singer_split_by_space[0] . ' ' . end($singer_split_by_space));
        // 2. If also not found, try search for first singer name
        if (empty($song['seed'])) 
            $song = if_song_exists($track['title'], $singer_split_by_space[0]);
        // 3. If also not found, try search for the title only
        if (empty($song['seed'])) 
            $song = if_song_exists($track['title'], '');

        if (!empty($song['seed'])) {
            array_push($track_ids, $song['seed']);
        }
        array_push($result, $song);
    }

    $all_song_features = get_tracks_features($track_ids);
    $current_feature_id = 0;

    foreach ($result as $song) {
        if (empty($song['seed'])) {
            $song['features'] = null;
        } else {
            $song['features'] = $all_song_features[$current_feature_id];
        }

        $current_feature_id += 1;
    }

    echo json_encode($result);
}

?>