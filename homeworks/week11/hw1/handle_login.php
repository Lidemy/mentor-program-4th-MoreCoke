<?php
session_start();
require_once('conn.php');
require_once("utils.php");

if (
  empty($_POST['username']) ||
  empty($_POST['password'])
) {
  header('Location: login.php?errCode=1');
  die('資料不齊全');
}

$username = $_POST['username'];
$password = $_POST['password'];
$sql = sprintf(
  'SELECT * FROM morecoke_users WHERE username="%s"',
  $username
);
$result = $conn->query($sql);
if (!$result) {
  die('' . $conn->error);
}
if($result->num_rows === 0) {
  header("Location: login.php?errCode=2");
  exit();
}

//有查到使用者
$row = $result->fetch_assoc();
if(password_verify($password, $row['password'])) {
  $_SESSION['username'] = $username;
  header("Location: index.php");
  // echo '登入成功!';
} else {
  header("Location: login.php?errCode=2");
}
?> 