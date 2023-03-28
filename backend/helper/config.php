<?php
$CONFIG = array(
    'spotify_api' => 'https://api.spotify.com/v1',
    'deezer_api' => 'https://api.deezer.com',
    'spotify_client_id' => '',
    'spotify_client_secret' => '',
);

$GLOBAL_DATA = array(
    'spotify_authorization' => '',
);

function read_spotify_secret_key() {
    global $CONFIG;
    $file_content = fopen('../spotify.secretkey', 'r');
    $CONFIG['spotify_client_id'] = trim(fgets($file_content));
    $CONFIG['spotify_client_secret'] = trim(fgets($file_content));
    fclose($file_content);
}

function get_new_spotify_token() {
    global $CONFIG, $GLOBAL_DATA;
    $url = 'https://accounts.spotify.com/api/token';
    $data = array(
        'grant_type' => 'client_credentials',
        'client_id' => $CONFIG['spotify_client_id'],
        'client_secret' => $CONFIG['spotify_client_secret'],
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

    // echo var_dump(http_build_query($data));
    // echo var_dump($json_data);

    $GLOBAL_DATA['spotify_authorization'] = 'Bearer '. $json_data['access_token'];
}

if (empty($CONFIG['spotify_client_id']) || empty($CONFIG['spotify_client_secret'])) {
    read_spotify_secret_key();
    get_new_spotify_token();
}

// echo var_dump($CONFIG);

// echo var_dump($GLOBAL_DATA);
?>