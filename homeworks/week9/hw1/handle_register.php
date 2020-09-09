<?php
  require_once('conn.php');
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  if(!empty($nickname) && !empty($username) && !empty($password)) {
    $sql = sprintf(
      'INSERT INTO morecoke_users (nickname, username, password) VALUE ("%s", "%s", "%s")',
      $nickname,
      $username,
      $password
    );
    $result = $conn->query($sql);
    if(!$result) {
      die($conn->error);
    }
    print_r($result);
  } else {
    header('Location: register.php?errCode=1');
  }

