<?php
require_once('config.php');

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: *");

/**
 * Use ChatGPT Chat-completion API to answer a provided question
 * 
 * @param   string  $question   Input question
 * @return  string  the answer from ChatGPT
 */
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

    // echo var_dump($json_output);

    try {
        return $json_output['choices'][0]['message']['content'];
    } catch (Exception $e) {
        return "ChatGPT is now busy. Please try again in 1 hour!";
    }
}

/**
 * Ask ChatGPT to list some fun fact of a song
 * 
 * @param   string  $song       Song name
 * @param   string  $singer     Singer name
 * 
 * @return  string  The answer from ChatGPT
 */
function ask_chatgpt_funfact($song, $singer) {
    $question = 'List me some fun fact about the song ' . $song . ' by ' . $singer;
    return ask_chatgpt($question);
}

/**
 * Ask ChatGPT to list some achievements of a song
 * 
 * @param   string  $song       Song name
 * @param   string  $singer     Singer name
 * 
 * @return  string  The answer from ChatGPT
 */
function ask_chatgpt_achievement($song, $singer) {
    $question = 'List me some achievements of ' . $singer . '\'s ' . $song;
    return ask_chatgpt($question);
}

/**
 * Ask ChatGPT to describe the similarities of a song
 * 
 * @param   {name, singer}  $original_song      First song
 * @param   {name, singer}  $suggested_song     Second song
 * 
 * @return  string  The answer from ChatGPT
 */
function ask_chatgpt_similarity($original_song, $suggested_song) {
    $question = 'Objectively, how does ' . $suggested_song['name'] . ' by ' . $suggested_song['singer']
        . ' have similar vibes to ' . $original_song['name'] . ' by ' . $original_song['singer']
        . '?';
    return ask_chatgpt($question);
}

?>