## 什麼是 Ajax？

js 的非同步處理。平常的程式碼是逐行執行的，但如果說今天我們的網站上有需要向其他地方取得資料的話就需要利用非同步處理，因為取資料載入也需要時間，編譯器在等待的時間會先跳過資料載入的程式碼部分先去繼續執行完剩下不會有需要等待情況的程式碼，最後資料下載好了就能回頭繼續處理剛剛跳過的部分。

## 用 Ajax 與我們用表單送出資料的差別在哪？

Form 表單送出資料會刷新頁面，ajax 不會。

## JSONP 是什麼？

在瀏覽器請求資料會有跨網域的問題，但是用 `<script>` 標籤載入環境卻不會有問題，所以就有人想出先把資料用 JSON 物件存在 url 網址，再用 `<script>` 載入連結，接著再用另個 `<script>` 寫個簡單的 JS 來取資料，這種巧妙繞過跨網域存取資料的方法稱為 JSONP。

簡單範例

```html
<script src="http://www.example.net/sample.aspx?callback=mycallback"/>

<script>
function mycallback(response) {
  console.log(response);
}
</script>
```

參考資料:

* [What is JSONP, and why was it created?](https://stackoverflow.com/questions/2067472/what-is-jsonp-and-why-was-it-created)
* [JavaScript | JSONP](https://www.geeksforgeeks.org/javascript-jsonp/)

## 要如何存取跨網域的 API？

可以新增 XMLHttpRequest 物件進行非同步請求或是用 fetch 來做。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

跨網域問題其實是瀏覽器的保護機制，我們送出的非同步請求其實是有成功的，只是說拿到的 response 會被瀏覽器擋掉，造成我們拿不到資料使網頁報錯。

如果想開放自己網站的資料給任何人存取，可以在 Response Header 中設定 `Access-Control-Allow-Origin: *`。

參考資料:

* [前端三十｜22. [FE] 為什麼跨域請求會產生錯誤？如何處理？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-22-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E8%B7%A8%E5%9F%9F%E8%AB%8B%E6%B1%82%E6%9C%83%E7%94%A2%E7%94%9F%E9%8C%AF%E8%AA%A4-%E5%A6%82%E4%BD%95%E8%99%95%E7%90%86-a2145e141d51)