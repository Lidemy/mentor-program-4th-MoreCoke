<?php
  require_once("conn.php");

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    "SELECT " .
    "C.id AS id, C.content AS content, C.created_at AS created_at, " .
    "U.nickname AS nickname, U.username AS username " .
    "FROM morecoke_comments AS C " .
    "LEFT JOIN morecoke_users as U ON C.username = U.username " .
    "WHERE C.is_deleted IS NULL " .
    "ORDER BY C.id DESC " .
    "limit ? offset ?"
  );
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("Error:" . $conn->error);
  }
  $result = $stmt->get_result();
  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push($comments, array(
      'id'=> $row['id'],
      'username'=> $row['username'],
      'nickname'=> $row['nickname'],
      'content'=> $row['content'],
      'created_at'=> $row['created_at']
    ));
  }

  $json = array(
    'comments' => $comments
  );
  $response = json_encode($json);
  header('Content-type:application/json;charset=utf-8');
  echo $response;
  