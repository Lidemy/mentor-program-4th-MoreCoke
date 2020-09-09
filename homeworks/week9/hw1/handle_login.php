<?php
  require_once('conn.php');

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
    header('Location: index.php'); 
  }