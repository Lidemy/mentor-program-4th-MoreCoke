<?php
require_once('conn.php');
header('Content-Type: application/json;charset=utf-8');
if (empty($_POST['content'])) {
  $arr = array(
    'ok' => false,
    'message' => 'Please input content'
  );
  $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
  echo $json;
  die();
}
$content = $_POST['content'];
$username = $_POST['username'];
$sql = 'INSERT INTO morecoke_comments (username, content) VALUE (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$result = $stmt->execute();
if (!$result) {
  $arr = array(
    'ok' => false,
    'message' => $conn->error
  );
  $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
  echo $json;
}
$arr = array(
  'ok' => true,
  'message' => 'Success'
);
$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
echo $json;
