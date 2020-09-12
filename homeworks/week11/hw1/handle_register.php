<?php
session_start();
require_once('conn.php');

if (
  empty($_POST['nickname']) ||
  empty($_POST['username']) ||
  empty($_POST['password'])
) {
  header('Location: register.php?errCode=1');
  die('資料不齊全');
}

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$sql = 'INSERT INTO morecoke_users(nickname, username, password) VALUE(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password);
$result = $stmt->execute();
if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header('Location: register.php?errCode=2');
  }
  die('' . $conn->error);
}

$_SESSION['username'] = $username;
header("Location: index.php");
?> 