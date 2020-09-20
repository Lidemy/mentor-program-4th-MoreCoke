<?php
require_once('conn.php');
$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];

if (!empty($nickname) && !empty($username) && !empty($password)) {
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $sql = 'INSERT INTO morecoke_users (nickname, username, password) VALUE (?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();
  if (!$result) {
    die(header('Location: register.php?errCode=2'));
  }
  header('Location: index.php');
} else {
  header('Location: register.php?errCode=1');
}
