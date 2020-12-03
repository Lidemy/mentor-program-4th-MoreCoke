<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

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
if (empty($_GET['limit'])) {
  $sql = 'SELECT nickname, content, created_at FROM morecoke_discussions where site_key=? ORDER BY created_at DESC';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $siteKey);
  $result = $stmt->execute();
  $isTotal = true;
} else {
  $limit = (int)$_GET['limit'];
  // $sql = sprintf('SELECT COUNT(*) AS total FROM morecoke_discussions where site_key="%s"', $siteKey);
  // $totalResult = $conn->query($sql);
  // $row = $totalResult->fetch_assoc();
  $sql = 'SELECT COUNT(*) AS total FROM morecoke_discussions where site_key=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $siteKey);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $total = $row['total'];
  $isTotal = false;
  if ($limit >= $total) {
    $limit = $total;
    $isTotal = true;
  }
  $sql = 'SELECT nickname, content, created_at FROM morecoke_discussions where site_key=? ORDER BY created_at DESC limit ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $siteKey, $limit);
  $stmt->execute();
}

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
  'isTotal' => $isTotal,
  'discussions' => $discussions
);

$response = json_encode($json);
echo $response;
