<?php
require_once('conn.php');
$item_limit = 10;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $item_limit;
$sql = 'SELECT ' .
  'users.nickname, users.username, ' .
  'comments.id, comments.content, comments.is_deleted, comments.created_at ' .
  'FROM ' .
  'morecoke_comments AS comments ' .
  'LEFT JOIN ' .
  'morecoke_users AS users ' .
  'ON ' .
  'comments.username=users.username ' .
  'WHERE ' .
  'comments.is_deleted IS NULL ' .
  'ORDER BY comments.created_at DESC ' .
  "limit ? offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $item_limit, $offset);
$stmt->execute();
$result = $stmt->get_result();
if (!$result) {
  die('錯誤' . $conn->error);
}
$arr = array();
while ($row = mysqli_fetch_assoc($result)) {
  array_push($arr, array(
    "id" => $row['id'],
    "username" => $row['username'],
    "nickname" => $row['nickname'],
    "content" => $row['content'],
    "created_at" => $row['created_at']
  ));
}
header('Content-Type: application/json;charset=utf-8');
$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
echo $json;
