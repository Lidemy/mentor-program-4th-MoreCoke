<?php
require_once('conn.php');
if (empty($_POST['nickname']) || empty($_POST['content']) || empty($_POST['site_key'])) {
  $json = array(
    'ok' => false,
    'message' => 'Please input missing fields'
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$nickname = $_POST['nickname'];
$content = $_POST['content'];
$siteKey = $_POST['site_key'];
$sql = 'INSERT INTO morecoke_discussions (nickname, content, site_key) VALUES (?,?,?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $content, $siteKey);
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

$sql = 'SELECT * FROM morecoke_discussions ORDER BY id DESC LIMIT 1';
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$json = array(
  'ok' => true,
  'message' => array(
    'nickname' => $row['nickname'],
    'content' => $row['content'],
    'created_at' => $row['created_at']
  )
);
$response = json_encode($json);
echo $response;
