## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

### Event Loop 是什麼?

Event Loop 是 JS 執行環境用來處理非同步任務中的機制。JS 的執行環境主要有瀏覽器和 Node.js，這邊就用瀏覽器來解釋。因為 JS 是單線程的語言，程市碼是逐行執行，為了處理非同步造成網頁渲染卡頓的問題，，瀏覽器會透過 web api 將非同步任務放入 callback queue 排隊處理，用來優化使用體驗。

工作流程:

1. 執行 call stack 中的任務，如果沒任務就去檢查 callback queue。
2. 將 callback queue 的任務丟給 call stack 做，回到步驟一。

其他相關的內容還有:

1. macro task: 主要的非同步任務，通常是 DOM 的事件綁定、setTimeOut 等等
2. micro task: macro task 下要執行的內容，promise 歸類在這
3. heap: 網頁執行的記憶體，可以想程我們寫完的程式碼會放在這編譯
4. callback queue / task queue: 用來處理非同步任務的地方
5. web apis: 瀏覽器提供的 api，用來協助處理非同步任務
6. call stack: 執行程式碼的地方，執行的方式採用後進先出

### JS 的執行環境(Execution Context)

分成兩種:

1. Global Execution Context，在讀取 script 標籤時建立，只會有一個
2. Function Execution Context，在建立 function 時建立，會有多個

在執行環境中會有兩個階段:

1. Creation Pharse，建立 variable object，建立範疇鍊，建立 this，將宣告的變數和函式提升
2. Execution Pharse，逐行執行，定義 this，取決於怎麼呼叫的，變數賦值

```js
var a = 1;
let b = 2;
window.a // 1
window.b // undefined
```

用 var 宣告的變數如果是出現在函式命名外會被加進 global object，let 不會。

hw4

function.call()

### 閉包

主要用途是不希望開發者直接改變數，必須透過函式更改。有個狀態可能會頻繁更改，但又不希望其他人直接對變數賦值就會用閉包。

使用閉包的部分不會被 JS 的垃圾回收機制處理。

像是:

```js
function test() {
  var _name = 'test';
  function change(n) {
    _name = n;
  }
  function name() {
    return _name;
  }
  return {
    name,
    change
  }
}
```
