<script>
    const params = new URLSearchParams(window.location.search);
    var password = prompt("Lösenord: ")
    window.location.href = "login.php?password_input=" + password;
</script>
<?php
$password_input = $_GET['password_input'];
$password_hash = '$2y$10$2A6tOQeSYv8NUSvXaOB8RO67qFXJnOZ47lNmg8WOaeU57nI9aTsru';
if (password_verify($password_input, $password_hash)) {
    setcookie('admin_status', true, time() + 3600);
    header("Location: admin.php");
}
?>