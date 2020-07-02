## hw1：好多星星

[LIOJ 連結](https://oj.lidemy.com/status/30594e7ea639776e4fc6e79d1696fb8f)

利用字串特性，建立一個 str 變數，然後用 for 迴圈組字串再印出來。

## hw2：水仙花數

[LIOJ 連結](https://oj.lidemy.com/status/fc7b35a1679cba6ade9d43a527bfffb7)

先想要怎麼寫迴圈，從題目得知會給固定範圍，所以第一層的迴圈就是用這範圍寫迴圈，這裡的迴圈變數設為 i，因為水仙花數的特性是數字幾位數然後再去乘幾次方，所以 將 i 數字拆成陣列來看，ex : `100 => [1,0,0]` 這裡使用 `Array.from` 完成，這個方法可以將類陣列的東西做成陣列，所以我先將數字轉成字串，然後再用 `map` 方法將陣列內的字串轉成數字。這個陣列的長度就相當於幾位數。

```js
for (let i = n; i <= m; i += 1) {
    const arr = Array.from(i.toString()).map(Number);
    // dosomething
  }
```

再用新做的陣列去跑第二層迴圈，進行次方的運算。如果數字是水仙花數就把它印出來。

一開始的寫法有個地方失誤 :

```js
for(let j = 0; j < len; j++) {
  narc += arr[j] ** len;
  if(narc === i){
    console.log(narc);
  }
}
```

這樣的寫法意思是我每算一次位數的數字就會去 if 判斷句檢查一次，造成數字會有重複印的可能，以 370 這數字為例，這數字就被印了兩次 ，在 `j = 1` 時 narc 已經是 370 了，3 的 3 次方加上 7 的 3 次方，這裡會印出一次，接著 `j = 2` 時 narc 還是 370 ，3 的 3 次方加上 7 的 3 次方加上 0 的 3 次方，這裡又會再印一次。最後才想到把 if 判斷移到外面來就沒事了，這樣就是等次方運算全做完再去檢查是不是水仙花數。

```js
for (let i = n; i <= m; i += 1) {
    const arr = Array.from(i.toString()).map(Number);
    const len = arr.length;
    let narc = 0;
    for (let j = 0; j < len; j += 1) {
      narc += arr[j] ** len;
    }
    if (narc === i) {
      console.log(narc);
    }
}
```

## hw3：判斷質數

[LIOJ 連結](https://oj.lidemy.com/status/770ebf7d79c3876dc524304e57c73320)

[LIOJ 連結(參考解答)](https://oj.lidemy.com/status/1b9ff58e896f9a0d52e8163fd387473b)

### 自己寫

這題不難，另外寫了一個 isPrime 的 function 用來 return 是否是質數的結果，在 solve 的 function 中寫個迴圈，並在迴圈中呼叫 isPrime 解決問題。

---

### 參考解答

學到了數學小知識，縮短迴圈跑的範圍。

```js
// 找根號以內的數就好，這是數學小知識
const num = Math.sqrt(n);
// i <= num 是小於等於要記得改
for (let i = 2; i <= num; i++) {
  if (n % i === 0) {
    return "Composite";
  }
}
```

## hw4：判斷迴文

[LIOJ 連結(方法 1)](https://oj.lidemy.com/status/f2c7a447150e30d6f85fb4cd761e1c7f)

[LIOJ 連結(方法 2)](https://oj.lidemy.com/status/7262c002e4931e9fc67669e913e7b7e9)

### 方法 1

先將傳入的字串轉成兩個陣列，一個正常順序，另一個反轉順序的陣列，這裡直接使用 js 內建的 `reverse()` 進行反轉，要注意的是這個方法會變異( mutable )原本的陣列，為了不要動到原本陣列內容的順序，需要在從原本的陣列複製一份陣列來反轉，因為陣列內的值都是數字(primitive type)，用淺拷貝就可以解決問題，用  `slice()` 複製完成需求。

```js
const arr = lines[0].split('');
const reverseArr = arr.slice().reverse();
```

或是用展開運算子也行。

```js
const arr = lines[0].split('');
const reverseArr = [...arr].reverse();
```

另外寫了一個 isPalindrome 的 function 用來回傳值，這個 function 的兩個參數為正常陣列和反轉順序的陣列，接著用陣列長度開始跑迴圈，比對兩個陣列內的元素是否相同，只要內容不同 `arr1[i] !== arr2[i]` 就回傳 'False'。

```js
function isPalindrome(arr1, arr2) {
  for(var i = 0 ; i< arr1.length; i++){
    if(arr1[i] !== arr2[i]) {
      return 'False';
    }
  }
  return 'True';
}
```

最後就是印出答案了!

```js
console.log(isPalindrome(arr, reverseArr));
```

---

### 方法2

我比較喜歡這方法，看廢片休息時想到的，簡單然後程式碼又少，迴文的重點是字串反轉後還是**一樣**。
所以直接將轉完的字串跟原本的字串比較是不是一樣就好了，也不用跑迴圈。

反轉字串要先拆成陣列後反轉陣列再組回字串。

```js
const reverseStr = str.split('').reverse().join('');
```

## hw5：聯誼順序比大小

[LIOJ 連結(我的寫法)](https://oj.lidemy.com/status/e84d677a67b15d2e559be9f2710e50ec) / [Eslint 糾正寫法](https://oj.lidemy.com/status/230913c205252604aeb74470a7a1c0a4)

[LIOJ 連結(解答)](https://oj.lidemy.com/status/8bdfadd09a436106abcd63563e5f79a1)

### 我的寫法

看了解答後發現有更簡潔的寫法，雖然我的寫法跟解答花費的時間都是 40ms，但解答用的行數更少。
主要是因為分類方式的不同，在跑迴圈時**我先判斷這次比大小是要比大還是比小**，然後再根據輸贏印出答案。

```js
if(k === 1) { // 比大的情形
  if (a > b) {
    console.log('A');
  } else if (b > a) {
    console.log('B');
  } else {
    console.log('DRAW');
  }
} else { // 比小的情形
  if (a < b) {
    console.log('A');
  } else if (b < a) {
    console.log('B');
  } else {
    console.log('DRAW');
  }
}
 ```

後來根據 eslint 的錯誤提示將 else 部分修改 :
不過這樣子看起來不太直觀，要稍微想一下才會知道程式碼在幹嘛。

```js
if (k === 1) {
  if (a > b) {
    console.log('A');
  } else if (b > a) {
    console.log('B');
  } else {
    console.log('DRAW');
  }
} else if (a < b) {
    console.log('A');
  } else if (b < a) {
    console.log('B');
  } else {
    console.log('DRAW');
  }
```

---

### 解答

解答則是從印出的結果: A 、B 、DRAW 去設定條件，寫出來的程式碼自然簡潔許多。

```js
    if(a === b){
      console.log('DRAW');
    } else if ((a > b && p == 1) || (a < b && p == -1)) {
      console.log('A');
    } else {
      console.log('B');
    }
  ```
