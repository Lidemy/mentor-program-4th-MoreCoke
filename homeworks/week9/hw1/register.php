<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./index.css">
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <h1 class="board-title">註冊</h1>
    <?php
      $errCode = isset($_GET['errCode']) ? $_GET['errCode'] : null;
      if($errCode === '1') {
    ?>
      <h2 class="error">錯誤: 資料不齊全</h2>
    <?php }?>
    <form method="POST" action="handle_register.php" class="board-comment">
      <div class="board-input">
        <span>暱稱:</span>
        <input type="text" name="nickname"">
      </div>
      <div class="board-input">
        <span>帳號:</span>
        <input type="text" name="username">
      </div>
      <div class="board-input">
        <span>密碼:</span>
        <input type="password" name="password">
      </div>
      <input type="submit" class="board-btn">
    </form>

  </main>
</body>

</html>