<?php
require_once('conn.php');
$id = $_GET['id'];
$sql = 'UPDATE morecoke_comments SET is_deleted=1 WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
header('Location: index.php');
