## Redux middleware 是什麼？

用來處理非同步的東西，redux 原本只能處理同步的行為，middleware 在 store 前先把從 dispatch 發送過來的 action 物件處理過，再把新的資料送給 store 做更新。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR 由 js 動態渲染瀏覽器，server 負責傳資料給前端，讓前端決定要將什麼資料注入 `<div id="root"></div>`，讓前端處理 render，在檢視網頁原始碼時會發現 `<div id="root"></div>` 內部是空的；SSR 由伺服器處理渲染內容， server 將資料和 html 模板建立完成再送給瀏覽器，由 server 處理 render。用 SSR 通常是為了處理 SEO。

## React 提供了哪些原生的方法讓你實作 SSR？

使用 ReactDOMServer 和它提供的 api: `renderToString`，它能將 component 轉成 HTML 字串。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

1. next.js
2. pre-render