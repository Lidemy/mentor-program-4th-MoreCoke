<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');

if (empty($_POST['content'])) {
  $json = array(
    'ok' => false,
    'message' => "Please input content"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$username = $_POST['username'];
$content = $_POST['content'];

$sql = 'INSERT INTO morecoke_comments(username, content) VALUE(?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$json = array(
  'ok' => true,
  'message' => "Success!"
);
$response = json_encode($json);
echo $response;
