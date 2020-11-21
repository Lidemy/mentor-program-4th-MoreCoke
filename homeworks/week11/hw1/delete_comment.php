<?php
session_start();
require_once('conn.php');
$id = $_GET['id'];
$username = $_SESSION['username'];
$sql = 'SELECT role FROM morecoke_users WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$role = $row['role'];
if ($role === 0) {
  $sql = 'UPDATE morecoke_comments SET is_deleted=1 WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $stmt->execute();
} else {
  $sql = 'UPDATE morecoke_comments SET is_deleted=1 WHERE id=? AND username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is', $id, $username);
  $stmt->execute();
}
header('Location: index.php');
