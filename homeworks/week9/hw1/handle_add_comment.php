<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}
$user = getUserFromUsername($_SESSION['username']);
$username = $user['username'];

$user_sql = sprintf(
  'select nickname from MoreCoke_users where username="%s"',
  $username
);
$user_result = $conn->query($user_sql);
$row = $user_result->fetch_assoc();
$nickname = $row['nickname'];
$content = $_POST['content'];
$sql = sprintf(
  'insert into MoreCoke_comments(nickname, content) values("%s", "%s")',
  $nickname,
  $content
);
$result = $conn->query($sql);
if (!$result) {
  die($conn->error);
}

header("Location: index.php");
