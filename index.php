<script>
    const params = new URLSearchParams(window.location.search);
    if (!params.has('password_input')) {
        var password = prompt("Lösenord: ")
        window.location.href = "index.php?password_input=" + password;
    }
</script>
<?php
// get the password input from var password input
$password_input = $_GET['password_input'];
$password_hash = password_hash("KFAB_2000", PASSWORD_DEFAULT);
if (password_verify($password_input, $password_hash)) {
    header("Location: index.html");
}
else {
    echo "Fel lösenord!";
}
?>