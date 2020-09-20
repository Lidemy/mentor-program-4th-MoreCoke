<?php
session_start();
require_once('conn.php');
$content = $_POST['content'];
$username = $_SESSION['username'];
$sql = 'INSERT INTO morecoke_comments (username, content) VALUE (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$stmt->execute();

header('Location: index.php');
