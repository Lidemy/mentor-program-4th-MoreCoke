<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$username = $_GET['username'];
$sql = 'SELECT todo_list FROM morecoke_todos WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  die();
}

$result = $stmt->get_result();
$row = $result->fetch_assoc();
$todoList = $row['todo_list'];
echo $todoList;
