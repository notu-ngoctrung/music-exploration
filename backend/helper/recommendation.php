<?php

require_once('config.php');

function if_song_exists($song, $singer) {
    global $CONFIG;
    $url = $CONFIG['spotify_api'] . '/search?q=' . urlencode($song) . '+artist:' . urlencode($singer) . '&type=track';
}

function get_recommended_list($seed_track) {

}

?>