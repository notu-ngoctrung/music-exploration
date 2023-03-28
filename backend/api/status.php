<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    http_response_code(200);
    echo "Success! Trung's still alive";
}
?>