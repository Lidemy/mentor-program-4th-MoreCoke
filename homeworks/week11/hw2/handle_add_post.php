<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$username = isSessionUser();
$title = isset($_POST['title']) ? $_POST['title'] : null;
$content = isset($_POST['content']) ? $_POST['content'] : null;
if (!$title || !$content) {
  die(header('Location: add_post.php?errCode=1'));
}

$sql = 'INSERT morecoke_blog_posts (username, title, content) VALUES (?,?,?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $username, $title, $content);
$result = $stmt->execute();
if ($result) {
  header('Location: index.php');
} else {
  die($conn->error);
}
