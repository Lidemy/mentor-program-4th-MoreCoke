<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = $_POST['username'];
$password = $_POST['password'];
$sql = 'SELECT * FROM morecoke_users WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$passwordHash = $row['password'];
$checkPassword = password_verify($password, $passwordHash);
if ($checkPassword) {
  $_SESSION['username'] = $username;
  header('Location: index.php');
} else {
  header('Location: login.php?errCode=1');
}
