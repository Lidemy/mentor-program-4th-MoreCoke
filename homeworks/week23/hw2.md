## 為什麼我們需要 Redux？

在大型專案中透過 redux 可集中管理資料，利用 reducer 將不同的資料分類，讓全部的組件都能存取修改，讓跨組件共用 state 變得簡單輕鬆。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

redux 是狀態管理的函示庫使用單向資料流處理資料。可以用來處理不同組件取用、更改同個資料會遇到的麻煩，不再需要透過共有組件利用 prop 將資料往下傳遞。

在了解資料流前要先知道幾個角色

* store: 負責紀錄全域的資料。
* action: 它是個物件，有 type (事件名稱) 和 payload (攜帶的資料)，主要用來描述要執行的行為。
* dispatch: 它是個函式，負責把收到的 action 送給 reducer。
* reducer: 能把它想成事件監聽器，根據收到的 action 執行對應的行為。

我們用在網頁上點擊按鈕的行為來解釋資料流，我們會先在 store 中寫好資料，在使用者點擊按鈕時會發送 dispatch(action) 給 reducer，最後 store 再把更新完的資料送回 view，網頁 re-render 完成。

## 該怎麼把 React 跟 Redux 串起來？

透過 react-redux，在根目錄利用 Provider 將專案的組件包起來，最後在 Provider 中注入 store `<Provider store={store}>`，最後在需要使用 store 資料的組件中透過 useDispatch 發送 action 觸發 reducer。
