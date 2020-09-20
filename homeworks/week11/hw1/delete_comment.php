<?php
require_once('conn.php');
$id = $_GET['id'];
$sql = 'DELETE FROM morecoke_comments WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
header('Location: index.php');
