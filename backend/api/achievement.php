<?php
require_once('../helper/chatgpt.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $singer = $data['singer'];
    $song = $data['song'];

    header('Content-Type: application/json');
    try {
        echo json_encode(ask_chatgpt_achievement($song, $singer));
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode('ChatGPT error');
    }
}

// if ($_SERVER['REQUEST_METHOD'] == 'GET') {
//     $response = ask_chatgpt_achievement('You belong to me', 'Taylor Swift');

//     echo '<pre>';
//     var_dump($response);
//     echo '</pre>';
// }

?>