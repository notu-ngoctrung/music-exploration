<?php
require_once('../helper/recommendation.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $singer = $data['singer'];
    $song = $data['song'];
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if_song_exists('You belong to me', 'Taylor Swift');
}
?>