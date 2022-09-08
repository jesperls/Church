<?php
// get the password input from var password input
$password_input = $_GET['password_input'];
$password_hash = "$2y$10$2A6tOQeSYv8NUSvXaOB8RO67qFXJnOZ47lNmg8WOaeU57nI9aTsru";
if (password_verify($password_input, $password_hash)) {
    header("Location: admin.html");
}
else {
    header("Location: index.html");
}
?>