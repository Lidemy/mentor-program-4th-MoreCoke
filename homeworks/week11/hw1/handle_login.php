<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = $_POST['username'];
$password = $_POST['password'];
$sql = sprintf(
  'SELECT * FROM morecoke_users WHERE username LIKE "%s"',
  $username
);

$result = $conn->query($sql);
$row = $result->fetch_assoc();
$passwordHash = $row['password'];
$checkPassword = password_verify($password, $passwordHash);
if ($checkPassword) {
  $conn->query($sql);
  $_SESSION['username'] = $username;
  header('Location: index.php');
} else {
  header('Location: login.php?errCode=1');
}
