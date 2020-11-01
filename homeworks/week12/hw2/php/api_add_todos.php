<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$username = $_POST['username'];
$todoList = $_POST['todo_list'];
$sql = 'INSERT INTO morecoke_todos (username, todo_list) VALUE (?,?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $todoList);
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
  'username' => $username,
  'todo_list' => $todoList
);
$response = json_encode($json);
echo $response;
