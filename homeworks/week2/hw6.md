``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程

1. 呼叫第 12 行的 isValid([3, 5, 8, 13, 22, 35])。
2. 執行第 3 行 for 迴圈，設定迴圈變數 i = 0 ，設定迴圈終止條件為 i < arr 陣列長度， 只要沒有符合終止條件，變數 i 就會加 1 。
3. 執行第 4 行，arr[i] 為當前迴圈跑到的值，如果陣列內的值 arr[i] 小於等於 0 的話，結束執行迴圈，回傳字串 invalid。
4. 執行第 6 行 for 迴圈，設定迴圈變數 i = 2 ，設定迴圈終止條件為 i < arr 陣列長度， 只要沒有符合終止條件，變數 i 就會加 1 。
5. 執行第 7 行，如果 arr[i] 的值不等於前兩項 arr[i-1] 和 arr[i-2] 的總和，結束執行迴圈，回傳字串 invalid。
6. 執行第 9 行回傳 valid。

這個 function 會先用第一個迴圈測試 arr 內的是否為正數，通過測試會再跑第二個迴圈，檢查陣列當前的值是否為前兩項的總和，通過測試後回傳 valid。
