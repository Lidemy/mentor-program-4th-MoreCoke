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

$json = array(
  'ok' => true,
  'message' => 'success'
);
$response = json_encode($json);
echo $response;
