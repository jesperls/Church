<script>
    const params = new URLSearchParams(window.location.search);
    var password = prompt("Lösenord: ")
    window.location.href = "index.php?password_input=" + password;
</script>
<?php
$password_input = $_GET['password_input'];
$password_hash = '$2y$10$1q2hcOc/mPAew3/M7QIkmerPhsKaDwYwxIZ3Zr349JO1./0R1YmsW';
if (password_verify($password_input, $password_hash)) {
    setcookie('login_status', true, time() + 3600);
    header("Location: main.php");
}
?>