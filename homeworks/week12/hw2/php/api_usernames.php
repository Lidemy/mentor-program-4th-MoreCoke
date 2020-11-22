<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$sql = 'SELECT username FROM morecoke_todos';
$stmt = $conn->prepare($sql);
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

$result = $stmt->get_result();
$json = array();

while ($row = $result->fetch_assoc()) {
  array_push($json, array('username' => $row['username']));
}

$response = json_encode($json);
echo $response;
