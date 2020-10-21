## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

加密是雙向的，只要能算出加密的演算法就可以反推加密過的密碼找回原本的密碼，所以只要知道加密所使用的演算法就能將忘記的密碼找回來。

雜湊是單向的，沒辦法用雜湊後的密碼回推原本的密碼，雜湊的演算法只要是輸入一樣的密碼就能導出一樣的結果，單向這概念有點像是數學二元方程式那樣，正推答案很簡單，但逆推超難，隨便舉例 x^3 +3\*y = 20 ，只要知道答案 x=2, y=4，帶入方程式很快就能知道答案是 20 了(正推答案)，但今天不知道 x 和 y 只知道最後會得到 20 的話，逆推出來非常困難，就是暴力解一個個數字慢慢帶去試答案。

雜湊也有個問題就是不同的輸入也有可能導致相同的結果，用上面的例子解釋的話，可以想成不同的 x 和 y 也能算出 20 的答案，不過機率會很低。

所以將密碼利用雜湊處理再存入資料庫和加密相比會安全許多，雜湊處理過的密碼就算被駭客知道了演算法也很難逆推回去找出原本的密碼。在更謹慎點，工程師會在將密碼雜湊前先加鹽，就是在原本的密碼中先加入其他內容再來進行雜湊，讓密碼更不好猜到。現在網站在使用者忘記密碼，也是直接請使用者換個新密碼來用也是因為這個原因，因為伺服器那邊也不知道使用者的密碼是什麼。

## `include`、`require`、`include_once`、`require_once` 的差別

inclue 和 require 都是用來匯入檔案的，它們的差別是如果找不到匯入的檔案， include 只會跳警告，而 require 除了跳警告外還會跳錯誤。警告不會影響程式執行，而錯誤會終止程式執行。

include_once 和 require_once 它們的差別也是一樣的就不多說，once 的意思是會檢查是不是已經有匯入過該檔案，如果之前有匯入過一樣的檔案那就不再匯入重做了。

## 請說明 SQL Injection 的攻擊原理以及防範方法

在任何客戶端可以進行輸入的地方加入 sql 的程式碼，利用註解的方式更改原本的程式碼。

假設今天有個帳號登入的功能是這樣寫的:

```php
require_once('conn.php');
$account=$_POST['account'];
$password=$_POST['password'];
$sql = sprintf(
  'SELECT * FROM users WHERE account="%s" AND password="%s"',
  $account,
  $password
  );
$conn->query($sql);
```

我可以在帳號的 input 那邊這樣寫 `123" OR 1=1#`，這樣 sql 這句話的意思會變成:

```php
$sql = 'SELECT * FROM users WHERE account="123" OR 1=1#" AND password="%s"'
```

這樣不用輸入密碼也能登入了。

## 請說明 XSS 的攻擊原理以及防範方法

在網頁插入 html 的標籤更改網頁，最常見的是插入 js 導到別的網頁、偷使用者的 cookie 資料，解決方法是將任何使用者輸入的資料再渲染到網頁前先編譯成字串處理，可以用 php 提供的 htmlspecialchars 來處理。

## 請說明 CSRF 的攻擊原理以及防範方法

原理: 駭客在網頁中塞入其他不同源的網頁的連結或是執行其他功能的連結，讓用戶做出非預期的行為。舉例來說把購物網站的查看更多的按鈕做成直接刷卡購買，讓用戶在不知道的情況下買了商品。

### 防範方法:

1. 加入圖形驗證碼，處理金流問題常用的手法，在使用網銀或是在電商網站消費都會看到。

2. SameSite cookie，此為瀏覽器提供的防禦方法，加入後會禁止不同源的網站請求。現在 Chrome 的 cookie 預設都是無法跨網域的，除非想把 SameSite 關掉，不然不用再特別設定。

   在 PHP 中我們會寫 `setcookie("id", $value);` 這樣的程式碼告訴瀏覽器要在客戶端建立一個 cookie，這樣從伺服器送出的 Header 會長像這樣 `Set-Cookie: id=1234567;`。
   但是 Chrome 會幫你做成 `Set-Cookie: id=1234567;SameSite=Lax`。

   ### 參考資料

   - [MDN: SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
   - [MDN: HTTP cookies](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies)
   - [PHP 文件: PHP setcookie](https://www.php.net/manual/en/function.setcookie.php)
   - [部落格: PHP Cookie SameSite 的設定方式](https://blog.longwin.com.tw/2020/02/php-cookie-samesite-set-none-lax-2020/)
   - [部落格: 讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
   - [2020 年 2 月發行的 Google Chrome 瀏覽器將變更 SameSite Cookie 行為，且可能會停止 Salesforce 整合](https://help.salesforce.com/articleView?id=000351874&language=zh_TW&mode=1&type=1)
