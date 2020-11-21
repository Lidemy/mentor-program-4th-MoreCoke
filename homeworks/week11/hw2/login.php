<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
  <link rel="stylesheet" href="./css/reset.css" />
  <link rel="stylesheet" href="./css/index.css" />
</head>

<body>
  <nav>
    <ul class="blog-navlist">
      <li><a class="logo" href="index.php">Who's Blog</a></li>
      <li><a class="blog-navlist__item" href="#">文章列表</a></li>
      <li><a class="blog-navlist__item" href="#">分類專區</a></li>
      <li><a class="blog-navlist__item" href="#">關於我</a></li>
    </ul>
  </nav>
  <div class="blog-topic">
    <h1>存放技術之地</h1>
    <span>Welcome to my blog</span>
  </div>
  <div class="blog-wrapper">
    <form class="blog-block__login" method="POST" action="handle_login.php">
      <div class="blog-block__login-title">Log In</div>
      <?php
      $errCode = isset($_GET['errCode']) ? $_GET['errCode'] : null;
      if ($errCode === '1') { ?>
        <div class="error">帳號或密碼錯誤</div>
      <?php } ?>
      <div class="blog-block__login-label">USERNAME</div>
      <input class="blog-block__login-input" type="text" name="username">
      <div class="blog-block__login-label">PASSWORD</div>
      <input class="blog-block__login-input" type="password" name="password">
      <input class="blog-block__login-submit" value="登入" type="submit" />
    </form>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>