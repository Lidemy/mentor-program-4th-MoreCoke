<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

$user = getUserFromUsername($_SESSION['username']);
$nickname = $user['nickname'];
$content = $_POST['content'];

$sql = 'INSERT INTO morecoke_comments(nickname, content) VALUE(?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $content);
$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}

header("Location: index.php");