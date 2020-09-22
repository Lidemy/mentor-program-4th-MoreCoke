<?php
session_start();
require_once('conn.php');
$id = $_GET['id'];
$username = $_SESSION['username'];
$sql = 'UPDATE morecoke_comments SET is_deleted=1 WHERE id=? AND username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $id, $username);
$stmt->execute();
header('Location: index.php');
