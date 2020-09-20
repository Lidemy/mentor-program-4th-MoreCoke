<?php
session_start();
require_once('conn.php');
$comment_id = $_POST['comment_id'];
$content = $_POST['content'];
if (empty($content)) {
  header('Location: update_comment.php?id=' . $comment_id . '&errCode=1');
} else {
  $sql = 'UPDATE morecoke_comments SET content=? WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $content, $comment_id);
  $stmt->execute();
  header('Location: index.php');
}
