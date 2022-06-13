## 請列出 React 內建的所有 hook，並大概講解功能是什麼

* useEffect: 處理所有的副作用，像是非同步，在每次 render 更新 DOM 元素後且瀏覽器繪製完成後執行。

```js

useEffect(() => { 
  // 要執行的副作用 
  return () => {
    // cleanup function
    // 當前 component 清空時要執行的事件
  }
}, [dependency])

```

根據 dependency 的變動來決定是否要執行副作用。

* useLayoutEffect: 和 useEffect 一樣，差別在於執行時間，它在 render 更新 DOM 元素後，瀏覽器繪製完成前執行，如果想繪製最新的資料可以用這個 hook，不過要考慮到非同步造成瀏覽器繪製延遲的問題。

* useState: 建立 state 和更改 state 的 method，會回傳一個陣列 `[state, setState]`，更改 state 必須透過 setState 改，不能用其他方式。

* useMemo: 使用方式為 `useMemo(() => 複雜計算的值，[dependency])`，用來暫存經過複雜計算的值，如果 dependency 沒變就繼續用原本的值，省去每次 render 時重新計算的時間。

* useCallback: 使用方式為 `useCallback(() => 要做的事, [dependency])`，用來存 function，如果 dependency 沒變就繼續用原本的 function。

* useReducer: 和 useState 一樣，也是用來處理 state，適合處理複雜的 state，使用方式為 `const [state, dispatch] = useReducer(reducer, initialState)`。以下個別介紹:
  * state: 值。
  * action: 物件，內有定義事件名稱和傳遞的參數，長這樣 `{ type: 事件類型, payload: 傳遞參數 }`
  * dispatch: function，接收一個參數 action 物件，負責把 action 物件送給 reducer。
  * reducer: function, 接收兩個參數，state 值和 action 物件。類似事件監聽，從 dispatch 接收 action 物件，根據 action.type 執行對應的行為。
  * initialState: 初始的 state。

    ```js
      const initialState = { count: 0 };

      // action { type: 'add' };
      // action { type: 'minus' };
      // action { type: 'time' };
      // action { type: 'divide' };
      // action { type: 'init', payload: 傳遞參數 };

      function reducer(state, action) {
        switch (action.type) {
          case 'add':
            return { count: state.count + 1 };
          case 'minus':
            return { count: state.count - 1 };
          case 'time':
            return { count: state.count * 2 };
          case 'divide':
            return { count: state.count / 2 };
          case 'init':
            return { count: action.payload };
          default:
            throw new Error();
        }
      }

      function Counter() {
        const [state, dispatch] = useReducer(reducer, initialState);

        return (
          <div>
            <h1>Counter: { state.count } </h1>
            <button onClick={() => dispatch({ type: 'add' })}>add</button>
            <button onClick={() => dispatch({ type: 'minus' })}>minus</button>
            <button onClick={() => dispatch({ type: 'time' })}>time</button>
            <button onClick={() => dispatch({ type: 'divide' })}>divide</button>
            <button onClick={() => dispatch({ type: 'init', payload: 0 })}>init</button>
          </div>
        )
      }
    ```

* useContext: 可以用來儲存全部 component 會共用到的 state，在根目錄使用 `<Provider>` 包起來並透過 value 傳入要共用的值 `<HelloContext.Provider value={要共用的 state}>`，在需要使用 value 的 component 利用 `useContext` 即可取得對應的資料 `const { hello, sayHello } = useContext(HelloContext)`，Context 適合共用資料少的情境，資料一多建議使用 Redux 之類的狀態管理，不然會有 `<Provider>` 越包越多的問題出現。

```js
<ThemeContext.Provider value={theme}>
  <HelloContext.Provider value={hello}>
    <WorldContext.Provider value={world}>
      <App />
    </WorldContext.Provider>
  </HelloContext.Provider>
</ThemeContext.Provider>
```

* useRef: 回傳一個物件 `{ current: 存的資料 }`，可以用來存不會受到生命週期影響的值和 DOM 元素，和 state 不同的是 ref 是 mutable 且每次更改不會觸發 render。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

* constructor: 在 class component 建立後觸發，最早觸發且只觸發一次，會在這裡宣告 state 和把 this 與 method 透過 bind() 綁定。

* render: 在 constructor 建立後觸發一次，之後隨 state 更動觸發，會頻繁觸發。

* componentDidMount: 在第一次 render 執行後，react component 掛載到 DOM 元素後觸發，只會觸發一次。通常在這裡處理非同步問題和 DOM 元素操作。

* componentDidUpdate: 除了在第一次 render 時不會呼叫，每次的 props 和 state 更動時觸發，會頻繁觸發。

* componentWillUnmount: 在 class component 卸載前會執行一次，通常會在這移除事件監聽。

## 請問 class component 與 function component 的差別是什麼？

1. 用 class component 要懂 this 和 extend，用 function component 要懂閉包。
2. class component 因為 this 的緣故，在使用 this.props 取值會拿到最新的 props，可能會造成非預期的行為，這部分要特別注意，在 [react 文件 constructor 中 Note 的部分](https://reactjs.org/docs/react-component.html#constructor)有提到這個問題，可以看看。function component 因為閉包的關係沒有這問題。
3. class component 是個實際例子(instance)，沒有特意去 unmount 他會一直存在；function compoent 是函式執行過後的結果，會隨著每次的 render ，接收當下的 prop 和 state 利用閉包存起來，重新執行一個新的結果，更新後的 componet 是新的，舊的 component 在 render 執行完被 unmount 掉了。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

差在是否用 state 來管理資料， uncontrolled component 通常用 ref 來管理 component。
