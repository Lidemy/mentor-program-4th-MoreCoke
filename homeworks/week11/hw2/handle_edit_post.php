<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$username = isSessionUser();
$title = $_POST['title'];
$content = $_POST['content'];
$id = $_POST['id'];
if (!$title || !$content) {
  die(header('Location: edit_post.php?errCode=1'));
}
$sql = 'UPDATE morecoke_blog_posts SET title=?, content=? WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssi', $title, $content, $id);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}
header('Location: admin.php');
