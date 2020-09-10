<?php
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
      if(isset($_COOKIE['username'])) {
    ?>
      <a href="logout.php" class="board-btn">登出</a>
      <h1>Comments</h1>
      <h3>你好! <?= $_COOKIE['username']?></h3>
      <form class="board-comment" method="POST" action="handle_add_comment.php">
        <textarea class="board-comment__textarea" name="content" rows="5"></textarea>
        <input class="board-btn" type="submit">
      </form>
    <?php } else {?>
      <a href="register.php" class="board-btn">註冊</a>
      <a href="login.php" class="board-btn">登入</a>
      <h1>Comments</h1>
      <h3>請登入發布留言</h3>
    <?php }?>
    <div class="board-hr"></div>
    <?php
      $sql = 'SELECT * FROM morecoke_comments ORDER BY id DESC';
      $result = $conn -> query($sql);
      if(!$result) {
        die('錯誤'. $conn -> error);
      }
    ?>
      <?php while($row = mysqli_fetch_assoc($result)) {?>
        <div class="card">
          <div class="card-avatar"></div>
          <div class="card-body">
            <div class="card-info">
              <span class="card-author"><?= $row['nickname']?></span>
              <span class="card-time"><?= $row['created_at']?></span>
            </div>
            <div class="card-content"><?= $row['content']?></div>
          </div>
        </div>
      <?php }?>
  </main>
</body>

</html>