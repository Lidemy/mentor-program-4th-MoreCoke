<?php
session_start();
require_once('conn.php');

$username = $_POST['username'];
$password = $_POST['password'];
$sql = 'SELECT password FROM morecoke_blog_users WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$passwordHash = $row['password'];
$checkPassword = password_verify($password, $passwordHash);
if ($checkPassword) {
  header('Location: index.php');
  $_SESSION['username'] = $username;
} else {
  die(header('Location: login.php?errCode=1'));
}
