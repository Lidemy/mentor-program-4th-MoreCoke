<?php
session_start();
require_once('conn.php');

$username = $_SESSION['username'];
$id = $_GET['id'];
$sql = 'SELECT ' .
  'users.nickname, ' .
  'comments.id, comments.content ' .
  'FROM ' .
  'morecoke_comments AS comments ' .
  'LEFT JOIN ' .
  'morecoke_users AS users ' .
  'ON ' .
  'comments.username=users.username ' .
  'WHERE ' .
  'comments.id=? AND comments.username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $id, $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$nickname = $row["nickname"];
$content = $row["content"];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./index.css">
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <a href="index.php" class="board-btn">返回</a>
    <h3>你好! <?= $nickname ?></h3>
    <h1>編輯留言</h1>
    <?php
    $errCode = isset($_GET['errCode']) ? $_GET['errCode'] : null;
    if ($errCode === '1') { ?>
      <h2 class="error">不得留空!</h2>
    <?php
    }
    ?>
    <form class="board-comment" method="POST" action="handle_update_comment.php">
      <textarea class="board-comment__textarea" name="content" rows="5"><?= $content ?></textarea>
      <input type="hidden" name="comment_id" value="<?= $id ?>">
      <input class="board-btn" type="submit">
    </form>
    <div class="board-hr"></div>
  </main>
</body>

</html>