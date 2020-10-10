<?php
require_once('conn.php');
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : null;

$sql = 'SELECT * FROM morecoke_blog_posts WHERE is_deleted=false ORDER BY id DESC';
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./css/reset.css" />
  <link rel="stylesheet" href="./css/index.css" />
  <title>Blog</title>
</head>

<body>
  <nav>
    <ul class="blog-navlist">
      <li><a class="logo" href="index.php">Who's Blog</a></li>
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
    <div class="blog-block__group">
      <?php while ($row = $result->fetch_assoc()) {
        $title = $row['title'];
        $content = $row['content'];
        $created_at = $row['created_at'];
        $id = $row['id'] ?>
        <div class="blog-block">
          <div class="blog-block__header">
            <div class="blog-block__title">
              <?= $title ?>
            </div>
            <?php if ($username) { ?>
              <div>
                <a class="blog-block__edit-btn" href="edit_post.php?id=<?= $id ?>">編輯</a>
                <a class="blog-block__edit-btn" href="handle_delete.php?id=<?= $id ?>&page=index">刪除</a>
              </div>
            <?php } ?>
          </div>
          <div class="blog-block__time"><?= $created_at ?></div>
          <div class="blog-block__content ellipsis">
            <?= $content ?>
          </div>
          <a class="blog-block__read-more" href="single_post.php?id=<?= $id ?>">READ MORE</a>
        </div>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>