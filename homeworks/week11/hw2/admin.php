<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$username = isSessionUser();
$sql = 'SELECT * FROM morecoke_blog_posts WHERE username=? AND is_deleted=false ORDER BY id DESC';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
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
      <li><a class="blog-navlist__item" href="all_posts.php">文章列表</a></li>
      <li><a class="blog-navlist__item" href="#">分類專區</a></li>
      <li><a class="blog-navlist__item" href="#">關於我</a></li>
    </ul>
    <ul class="blog-navlist">
      <li><a class="blog-navlist__item" href="add_post.php">新增文章</a></li>
      <li><a class="blog-navlist__item" href="handle_logout.php">登出</a></li>
    </ul>
  </nav>
  <div class="blog-topic">
    <h1>存放技術之地 - 後台</h1>
    <span>Welcome to my blog</span>
  </div>
  <div class="blog-wrapper">
    <div class="blog-block__admin">
      <?php while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $title = $row['title'];
        $content = $row['content'];
        $created_at = $row['created_at'];
      ?>
        <div class="admin-post">
          <div><?= $title ?></div>
          <div>
            <span class="admin-post__time"><?= $created_at ?></span>
            <a class="admin-post__setting-btn" href="edit_post.php?id=<?= $id ?>">編輯</a>
            <a class="admin-post__setting-btn" href="handle_delete.php?id=<?= $id ?>&page=admin">刪除</a>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>