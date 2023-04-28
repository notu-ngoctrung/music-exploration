<?php
require_once('../helper/billboard.php');
require_once('../helper/spotify.php');
require_once('../helper/recommendation.php');

echo "<pre>";
echo var_dump(if_song_exists("Ch y La Pizza", "Fuerza Regida X Natanael Cano"));
echo "</pre>"; 

?>