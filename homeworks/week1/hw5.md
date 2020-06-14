## 請解釋後端與前端的差異

前端 : 網路使用者看的到的部分都是由前端做處理，網站的排版、點擊按鈕的互動和將資料從後端取回呈現給使用者看都是由前端負責的。

後端 : 負責資料處理，還有資訊安全的部分。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

在網頁收到關鍵字後由電腦的作業系統處理，先到 DNS 找伺服器 IP 位址，送到網路卡，讓網卡發送 request 請求到 IP位址 ，取回 response 後將其解析回傳給使用者使用。

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. `alias` 可以自訂指令，假如我想到首頁可以設定 `alias home="cd desktop"`，這樣打 `home` 就能到首頁了，只是關掉 cli 視窗這設定就沒了，想要永久設定在加個 `.bashrc`檔案，在這檔案裡加入 `alias home="cd desktop"` 就行了，可以跟著 [連結](https://superuser.com/questions/602872/how-do-i-modify-my-git-bash-profile-in-windows) 照做。我在 git bash 中可以用，但在 window 的 cmd 、vscode 的 powershell 中自訂指令就不能用了。

2. `date` 可以印出今天幾號和現在時間。

3. `nano` 跟 vim 很像，也是用來編輯文字內容的。
