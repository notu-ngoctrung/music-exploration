<?php
$CONFIG['spotify_api'] = 'https://api.spotify.com/v1';
$CONFIG['chatgpt_api'] = 'https://api.openai.com/v1/chat/completions';

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: *");

/**
 * Read the Spotify API token
 */
function read_spotify_token() {
    global $GLOBAL_DATA;

    $file_content = fopen('../spotify_token.secretkey', 'r');
    $GLOBAL_DATA['spotify_authorization'] = trim(fgets($file_content));
    fclose($file_content);
}

/**
 * Read the ChatGPT API token
 */
function read_chatgpt_token() {
    global $GLOBAL_DATA;

    $file_content = fopen('../chatgpt_token.secretkey', 'r');
    $GLOBAL_DATA['chatgpt_authorization'] = trim(fgets($file_content));
    fclose($file_content);
}

/**
 * Update the Spotify secret key if it is expired.
 */
function get_new_spotify_token() {
    global $GLOBAL_DATA;
    $spotify_client_secrets = fopen('../spotify.secretkey', 'r');
    $spotify_client_id = trim(fgets($spotify_client_secrets));
    $spotify_client_secret = trim(fgets($spotify_client_secrets));
    fclose($spotify_client_secrets);

    $url = 'https://accounts.spotify.com/api/token';
    $data = array(
        'grant_type' => 'client_credentials',
        'client_id' => $spotify_client_id,
        'client_secret' => $spotify_client_secret,
    );
    $headers = array(
        'Content-Type: application/x-www-form-urlencoded'
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    curl_close($curl);
    $json_data = json_decode($response, true);

    $file_content = fopen('../spotify_token.secretkey', 'w');
    fwrite($file_content, 'Bearer '. $json_data['access_token']);
    fclose($file_content);

    $GLOBAL_DATA['spotify_authorization'] = 'Bearer '. $json_data['access_token'];
}

if (empty($GLOBAL_DATA['spotify_authorization'])) {
    read_spotify_token();
}

if (empty($GLOBAL_DATA['chatgpt_authorization'])) {
    read_chatgpt_token();
}


?>