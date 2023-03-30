<?php
require_once('../helper/recommendation.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $singer = $data['singer'];
    $song = $data['song'];

    $found_song = if_song_exists('You belong to me', 'Taylor Swift');
    
    header('Content-Type: application/json');
    $result = '';
    if (empty($found_song)) {
        http_response_code(400);
        $result = 'No song is found';
    } else {
        http_response_code(200);
        $result = get_recommended_list($found_song['seed'], 10);
    }

    echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $song = if_song_exists('You belong to me', 'Taylor Swift');
    echo $song . '<br>';

    get_recommended_list($song['seed'], 10);
}
?>