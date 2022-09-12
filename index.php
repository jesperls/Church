
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Försäkringsvärdering</title>
        <link rel= "stylesheet" type= "text/css" href= "static/css/style.css">
        <link rel="icon" href="static/content/logo.png">
    </head>
    <body>
        <div id="login_box">
            <div id="login_box_content">
                <div id="login_box_header">
                    <img src="static/content/logo.png" alt="logo" id="login_box_logo">
                    <h1 id="login_box_title">Försäkringsvärdering</h1>
                </div>
                <div id="login_box_form">
                    <form action="index.php" method="get">
                        <input type="text" name="username" id="username" placeholder="Användarnamn">
                        <input type="password" name="password" id="password" placeholder="Lösenord">
                        <input type="submit" value="Logga in" id="login_button">
                    </form>
                </div>
            </div>
    </body>
<?php
if (isset($_GET['username']) && isset($_GET['password'])) {
    $username = strtolower($_GET['username']);
    $path = "users/" . $username;
    if (file_exists($path)) {
        $password = $_GET['password'];

        $file = fopen($path, "r");
        $password_hash = trim(fgets($file));
        $is_admin = fgets($file);
        fclose($file);
    
        if (password_verify($password, password_hash($password_hash, PASSWORD_DEFAULT))) {
            setcookie('username', $username, time() + 3600);
            setcookie('login_status', true, time() + 3600);
            setcookie('admin_status', $is_admin, time() + 3600);
            header("Location: main.php");
        }
        else {
            echo "Felaktigt lösenord";
        }
    }
    else {
        echo "Användaren finns inte";
    }
}
?>
</html>