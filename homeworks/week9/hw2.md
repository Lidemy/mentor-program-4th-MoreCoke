## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR 存放字元資料的最大長度可以在 1 ~ 65535 中自行設定最大長度，TEXT 沒辦法設定，它固定最大長度為 65535 個字元，這邊的字元是指英文字母 ABCD 那種，如果是中文的話，一個中文字等於 3 個字元。

好像還有看到很多不同的地方，但我不確定也不太懂就不先解釋，先在這裡記著，搞不好以後看這邊就會懂了。

引用 mysql 文件的一段話:

>If a TEXT column is indexed, index entry comparisons are space-padded at the end. This means that, if the index requires unique values, duplicate-key errors will occur for values that differ only in the number of trailing spaces. For example, if a table contains 'a', an attempt to store 'a ' causes a duplicate-key error. This is not true for BLOB columns.

* 如果我英文沒理解錯誤的話，這段是想說 TEXT 的欄位之所以無法放索引值(index)，是跟文字的句尾的空格有關，假如今天有兩筆 TEXT 資料，一筆是 'a' ，另一筆是 'a '(多了空格)，mysql 會判斷成一樣的東西，至於是判斷成都是 'a' 還是 'a ' 我不知道，進而造成 index 相同，最後出錯。

* VARCHAR 的存取速度一般來說會比 TEXT 快，我不知道為什麼，如果今天這兩種資料都存 65535 的字元那 VARCHAR 還會比較快嗎?

引用 [MySQL: Large VARCHAR vs. TEXT?](https://stackoverflow.com/questions/2023481/mysql-large-varchar-vs-text) 中的回覆:

>TEXT and BLOB may by stored off the table with the table just having a pointer to the location of the actual storage.

* 呈上，這篇討論說 TEXT 存在 table 的東西是像指標(pointer 的東西)，這些指標指向的地方才是真正存 TEXT 內容的地方。

參考資料:

* [Difference between VARCHAR and TEXT in MySQL (duplicate)](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)

* [MySQL: Large VARCHAR vs. TEXT?](https://stackoverflow.com/questions/2023481/mysql-large-varchar-vs-text)

* [11.3.4 The BLOB and TEXT Types](https://dev.mysql.com/doc/refman/5.7/en/blob.html)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 可以用來暫存使用者的相關資訊，最常見到的應用就是 Cookie 會幫我們紀錄登入會員的狀態，像是網購平台如果每次要買東西或是不小心關掉頁面就要重新登入那樣會超煩的，為了避免這種讓消費者恢復理性的行為發生，業者很貼心的利用 Cookie 解決問題，在消費者的瀏覽器加入了 Cookie ，裡面存有關使用者的資料，這樣每次瀏覽網頁時業者的 server 就會知道說你這個消費者是誰，然後吐給你資料。還有很多網頁上的廣告也是 Cookie 應用的一種，你應該會有經驗過去可能因為看過某商品的網頁然後接下來不管到哪個網頁上都會看到這商品的廣告，會有這種情形也是跟 Cookie 有關，不想再看到相關商品廣告的話可以試著把自己瀏覽器上的 Cookie 清空。

至於 http 怎麼設定 Cookie 這部分的操作跟後端有關，用這周學的 php 來說可以用個叫 setcookie() 的函式設定，這樣在我們第一次進行使用者登入時就會順便產生一個 Cookie，存在我們電腦上的瀏覽器，之後我們透過瀏覽器拜訪這些網站，換句話說就是送出 http request 會順便送出之前存在瀏覽器上的 Cookie ，網頁的 server 收到請求和 Cookie 時就可以根據 Cookie 內容，回傳使用者相對應的資料。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

* 我可以在留言插入 html tag。

* 也能插入 js

```html
<script language='javascript'>
  // 我能寫無窮迴圈搞壞留言板
 </script>
 ```

* 也試過插入 php 不過失敗了， php 的程式碼會被註解掉。

```php
<?php for($i=1; $i<=5; $i++) {?>
  <div><?php $i ?></div>
<?php }?>
```

在 html 中會是:

![php 問題](https://static.coderbridge.com/img/MoreCoke/6ade735118f543149f8e95ec8f13cfd0.png)
