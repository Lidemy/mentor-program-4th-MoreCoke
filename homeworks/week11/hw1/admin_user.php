<?php
session_start();
require_once('conn.php');
$username = $_SESSION['username'];
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
    <a href="logout.php" class="board-btn">登出</a>
    <a href="index.php" class="board-btn">回首頁</a>
    <h2>您好! 管理者: <?php echo $username ?></h2>
    <table class="admin-table">
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>nickname</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        <?php
        $sql = 'SELECT id,nickname,username,role FROM morecoke_users';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        function strRole($num)
        {
          switch ($num) {
            case 0:
              return '管理者';
              break;
            case 1:
              return '一般人';
              break;
            case 2:
              return '停權人';
              break;
          }
        }
        while ($row = $result->fetch_assoc()) {
          $id = $row['id'];
          $nickname = $row['nickname'];
          $username = $row['username'];
          $role = $row['role'];
        ?>
          <tr>
            <td><?= $id ?></td>
            <td><?= $username ?></td>
            <td><?= $nickname ?></td>
            <td>
              <span><?= strRole($role) ?></span>
              <form class="admin-select" action="update_admin_user.php" method="POST">
                <select class="board-btn" name="role">
                  <option value="0" <?= $role === 0 ? 'selected' : null ?>>管理者</option>
                  <option value="1" <?= $role === 1 ? 'selected' : null ?>>一般人</option>
                  <option value="2" <?= $role === 2 ? 'selected' : null ?>>停權人</option>
                </select>
                <input class="board-btn" type="submit">
                <input type="hidden" name="user_id" value="<?= $id ?>">
              </form>
            </td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  </main>
</body>

</html>