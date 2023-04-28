<?php
require_once('../helper/spotify.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $singer = $data['singer'];
    $song = $data['song'];
    $limit = $data['limit'];

    $found_song = if_song_exists($song, $singer);
    
    header('Content-Type: application/json');
    $result = '';
    if (empty($found_song)) {
        // Set the bad request header code
        http_response_code(400);
        $result = 'No song is found';
    } else {
        http_response_code(200);
        $result = get_recommended_list($found_song['seed'], $limit, $found_song);
    }

    echo json_encode($result);
}
?>