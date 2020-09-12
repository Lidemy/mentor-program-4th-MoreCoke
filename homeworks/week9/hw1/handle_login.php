<?php
  session_start();
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
    $conn->query($sql);
    $_SESSION['username'] = $username;
    header('Location: index.php'); 
  }