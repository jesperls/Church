<?php
$phpObj = array();
$phpObj = file_get_contents("php://input");
$decoded = json_decode($phpObj, true);
$path = "data/";
$myFile = $decoded["filename"];
$filetype = ".json";
unset($decoded["filename"]);
$encoded = json_encode($decoded);
unlink($path.$myFile.$filetype);
file_put_contents($path.$myFile.$filetype,$encoded);
var_dump($encoded);
?>