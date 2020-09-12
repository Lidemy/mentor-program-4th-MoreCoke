<?php
  require_once('conn.php');

  $toekn = $_COOKIE['token'];
  $sql = sprintf(
    'DELETE FROM tokens WHERE token = "%s"',
    $toekn
  );
  $conn->query($sql);
  setcookie('token', '', time() - 3600);
  header('Location: index.php');