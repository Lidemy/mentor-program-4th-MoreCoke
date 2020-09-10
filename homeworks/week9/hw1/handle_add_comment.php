<?php
  require_once('conn.php');

  $content = $_POST['content'];
  $token = $_COOKIE['token'];
  $sql = sprintf(
    'SELECT * FROM tokens WHERE token = "%s"',
    $token
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $username = $row['username'];
  $sql = sprintf(
    'SELECT * FROM morecoke_users WHERE username="%s"',
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  $sql = sprintf(
    'INSERT INTO morecoke_comments (nickname, content) VALUE ("%s", "%s")',
    $nickname,
    $content
  );
  $conn->query($sql);

  header('Location: index.php'); 