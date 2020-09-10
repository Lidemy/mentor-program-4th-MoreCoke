<?php
  require_once('conn.php');
  require_once('utils.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = sprintf(
    'SELECT * FROM morecoke_users WHERE username LIKE "%s" AND password LIKE "%s"',
    $username,
    $password
  );

  $result = $conn -> query($sql);
  $num_rows = $result->num_rows;
  if($num_rows === 0) {
    header('Location: login.php?errCode=1');
  } else {
    $expire = time() + 30*24*3600;
    $token = generateRandomString();
    $sql = sprintf(
      'INSERT INTO tokens (token, username) VALUE ("%s", "%s")',
      $token,
      $username
    );
    $conn->query($sql);
    setcookie('token', $token, $expire);
    header('Location: index.php'); 
  }