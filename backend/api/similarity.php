<?php
require_once('../helper/chatgpt.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $original_song = $data['orginalSong'];
    $suggested_song = $data['suggestedSong'];

    header('Content-Type: application/json');
    try {
        echo json_encode(ask_chatgpt_similarity($original_song, $suggested_song));
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode('ChatGPT error');
    }
}

?>