<?php
session_start();
require_once('conn.php');
$content = $_POST['content'];
$username = $_SESSION['username'];
if (empty($content)) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}
$sql = 'INSERT INTO morecoke_comments (username, content) VALUE (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$stmt->execute();

header('Location: index.php');
