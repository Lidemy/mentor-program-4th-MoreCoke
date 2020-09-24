<?php
session_start();
require_once('conn.php');
$username = $_SESSION['username'];
$nickname = $_POST['nickname'];
if (empty($nickname)) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}
$sql = 'UPDATE morecoke_users SET nickname=? WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $username);
$stmt->execute();

header('Location: index.php');
