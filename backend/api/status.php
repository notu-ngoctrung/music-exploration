<?php

// A dummy API endpoint to check if the backend is listening
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    http_response_code(200);
    echo "Success! Trung's still alive";
}
?>