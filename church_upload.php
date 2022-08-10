<?php
$phpObj = array();
$phpObj = file_get_contents("php://input");
$decoded = json_decode($phpObj, true);
$path = "saved/";
$myFile = $decoded["Namn"];
$filetype = ".json";
unlink($path.$myFile.$filetype);
file_put_contents($path.$myFile.$filetype,$phpObj);
var_dump($phpObj);
?>