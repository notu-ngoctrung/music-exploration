<?php

function simple_cmd_execute($command) {
    $output = array();
    $return_var = 0;
    exec($command, $output, $return_var);

    return [$output, $return_var];
}

?>