<?php
session_start();
require_once('conn.php');
$comment_id = $_POST['comment_id'];
$content = $_POST['content'];
$username = $_SESSION['username'];
if (empty($content)) {
  header('Location: update_comment.php?id=' . $comment_id . '&errCode=1');
} else {
  $sql = 'UPDATE morecoke_comments SET content=? WHERE id=? AND username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sis', $content, $comment_id, $username);
  $result = $stmt->execute();
  header('Location: index.php');
}
