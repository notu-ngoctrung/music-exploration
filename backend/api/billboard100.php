<?php
require_once('../helper/billboard.php');
require_once('../helper/spotify.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $top_100 = get_top_100();

    $result = array();

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
        // 4. If also not found, give up :)
        if (empty($song['seed'])) {
            // echo "\n". $track['title'] . ' |||| ' . $track['singers'] . "\n";
            $song['features'] = null;
        }
        else $song['features'] = get_track_features($song['seed']);
        array_push($result, $song);
    }

    echo json_encode($result);
}

?>