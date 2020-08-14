## 什麼是 DOM？

我們在 html 中所下的標籤在瀏覽器上會視為一個物件，這物件稱為 DOM，所以說當我們想在瀏覽器上的物件上添加行為時我們得加監聽事件，這樣才能執行相對應的行為。

DOM 物件以樹狀結構來表示每個物件之間的關係，html 標籤最外層的為父元素，內層為子元素。

```html

<div>
  <h1>123<span>456</span></h1>
</div>

```

以這段程式碼來說，樹狀結構由上到下的關係為: div => h1 => span 。


推薦文章: [Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

前面說過 DOM 元素是樹狀結構，以觸發監聽事件的 DOM 元素開始往其父元素傳遞事件的行為稱為冒泡，而捕獲則是觸發監聽事件的 DOM 元素的最外層父元素開始向子元素傳遞事件行為。事件傳遞的優先順序是 **先捕獲再冒泡** 。


## 什麼是 event delegation，為什麼我們需要它？

事件代理其實就是利用捕獲事件所做的監聽行為，通常會在需要觸發事件元素的父元素加入監聽事件，只需加入一個監聽事件就能監聽到子元素們不同的行為。而非在各個子元素們綁監聽事件，這樣做還要處理新增的子元素會沒有被加入監聽事件的問題。所以盡量用事件代理吧。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

`event.preventDefault()`: 避免 DOM 執行預設行為,以下面範例來說，a 連結就不會轉到 google 的首頁。

```html

  <a href="https://google.com" onclick="test(event)">Google</a>
  <script>
    function test(e) {
      alert(123)
      e.preventDefault()
    }
  </script>

```

`event.stopPropagation()`: 阻止冒泡行為，觸發冒泡事件的父層他們自己的監聽事件不會被觸發。以下方為例，點選 span 不會觸發 h1 和 div 的事件。

```html

<div>
  <h1>123<span>456</span></h1>
</div>

```

```js

document.querySelector('div').addEventListener('click', () => console.log('div'));

document.querySelector('h1').addEventListener('click', () => console.log('h1'));

document.querySelector('span').addEventListener('click', (e) => {
  console.log('span');
  e.stopPropagation()
  });

```
