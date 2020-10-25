<?php
require_once('conn.php');

if (empty($_GET['site_key'])) {
  $json = array(
    'ok' => false,
    'message' => 'PLease add site_key in url'
  );
  $response = json_encode($json);
  echo $response;
  die();
};


$siteKey = $_GET['site_key'];
$sql = 'SELECT nickname, content, created_at FROM morecoke_discussions where site_key=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $siteKey);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  die();
};

$result = $stmt->get_result();
$discussions = array();

while ($row = $result->fetch_assoc()) {
  array_push(
    $discussions,
    array(
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at' => $row['created_at']
    )
  );
};

$json = array(
  'ok' => true,
  'discussions' => $discussions
);

$response = json_encode($json);
echo $response;
