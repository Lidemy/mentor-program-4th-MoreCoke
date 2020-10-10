<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$username = isSessionUser();
$id = isset($_GET['id']) ? $_GET['id'] : null;
$sql = 'SELECT * FROM morecoke_blog_posts WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$title = $row['title'];
$content = $row['content'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/reset.css" />
  <link rel="stylesheet" href="./css/index.css" />
  <title>Blog</title>
</head>

<body>
  <nav>
    <ul class="blog-navlist">
      <li><a class="logo" href="index.php">Who's Blog</a></li>
      <li><a class="blog-navlist__item" href="#">文章列表</a></li>
      <li><a class="blog-navlist__item" href="#">分類專區</a></li>
      <li><a class="blog-navlist__item" href="#">關於我</a></li>
    </ul>
    <ul class="blog-navlist">
      <?php if ($username) { ?>
        <li><a class="blog-navlist__item" href="admin.php">管理後臺</a></li>
        <li><a class="blog-navlist__item" href="handle_logout.php">登出</a></li>
      <?php } else { ?>
        <li><a class="blog-navlist__item" href="login.php">登入</a></li>
      <?php } ?>
    </ul>
  </nav>
  <div class="blog-topic">
    <h1>存放技術之地</h1>
    <span>Welcome to my blog</span>
  </div>
  <div class="blog-wrapper">
    <?php
    $errCode = isset($_GET['errCode']) ? $_GET['errCode'] : null;
    if ($errCode) { ?>
      <div class="error">標題或內文不得留空</div>
    <?php } ?>
    <div class="blog-block__edit">
      <form class="blog-block__edit-form" method="POST" action="handle_edit_post.php">
        <div class="edit-title">更改文章</div>
        <input class="blog-block__edit-input" type="text" name="title" value="<?= $title ?>">
        <input type="hidden" name="id" value="<?= $id ?>">
        <textarea class="blog-block__edit-textarea" name="content" cols="30" rows="10"><?= $content ?></textarea>
        <input class="blog-block__edit-submit" type="submit" value="送出文章">
        <div class="clearboth"></div>
      </form>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>