<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$username = $_GET['username'];
$todoList = $_POST['todo_list'];
$sql = 'UPDATE morecoke_todos SET todo_list=? WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $todoList, $username);
$result = $stmt->execute();
if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
} else {
  $json = array(
    'ok' => true,
    'username' => $username,
    'todo_list' => $todoList
  );
  $response = json_encode($json);
  echo $response;
}
