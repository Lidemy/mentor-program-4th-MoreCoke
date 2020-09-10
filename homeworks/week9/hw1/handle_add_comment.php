<?php
  require_once('conn.php');

  $content = $_POST['content'];
  $cookie = $_COOKIE['username'];
  $sql = sprintf(
    'SELECT * FROM morecoke_users WHERE username = "%s"',
    $cookie
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