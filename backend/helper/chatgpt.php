<?php
require_once('config.php');

function ask_chatgpt($question) {
    global $CONFIG, $GLOBAL_DATA;

    $url = $CONFIG['chatgpt_api'];
    $input_data = array(
        'model' => 'gpt-3.5-turbo',
        'messages' => array(
            array(
                'role' => 'user',
                'content' => $question
            )
        ),
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input_data));
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: ' . $GLOBAL_DATA['chatgpt_authorization']
    ));

    $response = curl_exec($ch);
    curl_close($ch);
    $json_output = json_decode($response, true);

    try {
        return $json_output['choices'][0]['message']['content'];
    } catch (Exception $e) {
        return null;
    }
}

function ask_chatgpt_funfact($song, $singer) {
    $question = 'List me some fun fact about the song ' . $song . ' by ' . $singer;
    return ask_chatgpt($question);
}

function ask_chatgpt_achievement($song, $singer) {
    $question = 'List me some achievements of ' . $singer . '\'s ' . $song;
    return ask_chatgpt($question);
}

function ask_chatgpt_similarity($original_song, $suggested_song) {
    $question = 'Objectively, how does ' . $suggested_song['singer'] . '\'s ' . $suggested_song['name']
        . ' have similar vibes to ' . $original_song['singer'] . '\'s ' . $original_song['name']
        . '?';
    return ask_chatgpt($question);
}

?>