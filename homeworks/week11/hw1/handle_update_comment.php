<?php
session_start();
require_once('conn.php');
$comment_id = $_POST['comment_id'];
$content = $_POST['content'];
$username = $_SESSION['username'];
$sql = 'SELECT role FROM morecoke_users WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$role = $row['role'];
if (empty($content)) {
  header('Location: update_comment.php?id=' . $comment_id . '&errCode=1');
} else if ($role === 0) {
  $sql = 'UPDATE morecoke_comments SET content=? WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $content, $comment_id);
  $result = $stmt->execute();
  header('Location: index.php');
} else {
  $sql = 'UPDATE morecoke_comments SET content=? WHERE id=? AND username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sis', $content, $comment_id, $username);
  $result = $stmt->execute();
  header('Location: index.php');
}
