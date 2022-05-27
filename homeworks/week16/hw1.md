程式碼輸出的結果會是
1
3
5
2
4

1. main thread 進入 call stack。
2. `console.log(1)` 進入 call stack 後執行，執行後移除。
3. `setTimeOut` 是瀏覽器提供的 API，瀏覽器執行非同步任務，計時器到數 0 秒後將 `() => { console.log(2) }` 放入 callback queue。
4. `console.log(3)` 進入 call stack 後執行，執行後移除。
5. 瀏覽器執行非同步任務，計時器到數 0 秒後將 `() => console.log(4)` 放入 callback queue。
6. `console.log(5)` 進入 call stack 後執行，執行後移除。
7. 此時 call stack 沒有任務需要處理，檢查 callback queue，按先進來的順序執行任務，將 `console.log(2)` 放入 call stack。
8. `console.log(2)` 進入 call stack 後執行，執行後移除。
9. 此時 call stack 沒有任務需要處理，檢查 callback queue，按先進來的順序執行任務，將 `console.log(4)` 放入 call stack。
10. `console.log(4)` 進入 call stack 後執行，執行後移除。
