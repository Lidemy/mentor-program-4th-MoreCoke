<?php
session_start();
require_once('conn.php');
$username = $_SESSION['username'];
$sql = 'SELECT role FROM morecoke_users WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$role = $row['role'];

if ($role === 0) {
  $id = $_POST['user_id'];
  $role = $_POST['role'];
  $sql = 'UPDATE morecoke_users SET role=? WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: admin_user.php');
}
