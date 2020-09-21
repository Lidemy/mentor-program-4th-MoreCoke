<?php
session_start();
require_once('conn.php');
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
    <?php
    if (isset($_SESSION['username'])) {
      $username = $_SESSION['username'];
      $sql = "SELECT * FROM morecoke_users WHERE username = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $nickname = $row["nickname"];
    ?>
      <a href="logout.php" class="board-btn">登出</a>
      <span class="board-btn update-nickname">編輯暱稱</span>
      <h3>你好! <?= $nickname ?></h3>
      <form class="hide board-comment" method="POST" action="update_user.php">
        <div class="board-input">
          <span>新的暱稱:</span>
          <input type="text" name="nickname">
        </div>
        <input class="board-btn" type="submit">
      </form>
      <h1>Comments</h1>
      <form class="board-comment" method="POST" action="handle_add_comment.php">
        <textarea class="board-comment__textarea" name="content" rows="5"></textarea>
        <input class="board-btn" type="submit">
      </form>
    <?php } else { ?>
      <a href="register.php" class="board-btn">註冊</a>
      <a href="login.php" class="board-btn">登入</a>
      <h1>Comments</h1>
      <h3>請登入發布留言</h3>
    <?php } ?>
    <div class="board-hr"></div>
    <?php
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
      'LIMIT ? OFFSET ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $item_limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
      die('錯誤' . $conn->error);
    }
    ?>
    <?php while ($row = mysqli_fetch_assoc($result)) { ?>
      <div class="card">
        <div class="card-avatar"></div>
        <div class="card-body">
          <div class="card-info">
            <span class="card-author"><?= htmlspecialchars($row['nickname'], ENT_QUOTES) ?>(@
              <?= htmlspecialchars($row['username'], ENT_QUOTES) ?>)</span>
            <span class="card-time"><?= htmlspecialchars($row['created_at'], ENT_QUOTES) ?></span>
            <?php if (isset($_SESSION['username']) && $row['username'] === $username) { ?>
              <a href="update_comment.php?id=<?= $row['id'] ?>">編輯</a>
              <a href="delete_comment.php?id=<?= $row['id'] ?>">刪除</a>
            <?php } ?>
          </div>
          <div class="card-content"><?= htmlspecialchars($row['content'], ENT_QUOTES) ?></div>
        </div>
      </div>
    <?php } ?>
    <?php
    $sql = 'SELECT COUNT(*) AS count FROM morecoke_comments WHERE is_deleted IS NULL';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $item_limit);
    ?>
    <div class="page-info">
      <span>總共有 <?php echo $count ?> 筆留言，頁數:</span>
      <span><?php echo $page ?> / <?php echo $total_page ?></span>
    </div>
    <div class="pagination">
      <?php if ($page > 1) { ?>
        <a href="index.php?page=1">第一頁</a>
        <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php for ($i = 1; $i <= $total_page; $i++) { ?>
        <a href="index.php?page=<?php echo $i ?>"><?php echo $i ?></a>
      <?php } ?>
      <?php if ($page < $total_page) { ?>
        <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
      <?php } ?>
    </div>
  </main>
  <script>
    let btn = document.querySelector('.update-nickname');
    if (btn) {
      btn.addEventListener('click', () => {
        let nicknameForm = document.querySelector('form[action="update_user.php"]');
        nicknameForm.classList.toggle('hide');
      })
    }
  </script>
</body>

</html>