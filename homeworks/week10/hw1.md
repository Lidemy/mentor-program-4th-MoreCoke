## 六到十週心得與解題心得


現在進度落後，這幾周練習了切版和簡單的 js 邏輯，然後我又另外把 [week8 hw2 的 twitch 作業](https://github.com/MoreCoke/react-twitchTopGame)再用 react 寫一遍，這 react 練習還沒有用 webpack 那些東西，所以沒辦法在 github page 看，所以就先用 [codesandbox 的 page](https://i2juv.csb.app/) 的來頂著用拉。

大部分的時間都花在 php 上，這對我來說是新的領域。主要是學習 database 、table 最基礎的觀念以及如何使用 mysql workbench 、 phpmyadmin 等工具，每次學新東西時間花最多的地方就是建立開發環境、了解工具及讀文件上，建環境真的很頭痛，常因為 windows 環境變數、資料夾路徑或是缺少相關套件導致安裝失敗，這真的很煩人!

關於進度落後老實說一開始會有點擔心，畢竟在參加計畫的報名信裡我有立 Flag 說我有自信在前 10 週不會落後，結果現在爆了。現在進度落後久了也習慣了，現在的步調對我來說剛剛好，抱著每天都學一點點的心態去學習，壓力也不會那麼大，前四周瘋狂學習結果我的心態爆炸了，拖延症變得更嚴重，當時下班後吃個飯就繼續學，搞的心很累，現在的話下班回家就看自己的狀況調整，只要每天都有學一點點就好，看個小章節的影片或是寫個簡單功能之類的，如果當天負能量爆表就會去看自己之前寫的心得，回顧這段時間學到甚麼東西，聽聽歌又能繼續前進了。進度其實也沒照計畫的走，到處亂跳先補工作上需要用的知識。

這週的題目我只玩了 [綜合能力測驗](http://mentor-program.co/huli/game/index.php) ，紀錄一下卡關心得，首先看開發者工具發現 php 後帶入 `queryString`，接著把提示中的 css 屬性 `display: none` 給關掉，當時漏掉 `<input>` 的 css 屬性 `display: none` 所以找了很久，接著按完按鈕後到 console 去看找不到原因，試了很久才發現在 chrome 的 Network 中可以看 js 檔案，找到 `script.js` 並點 preview 選項就能看程式碼，當時看到這段我非常困惑 `typeof myMissingNumberToSetToMakeTheRequest` ，因為我根本找不到 `myMissingNumberToSetToMakeTheRequest` 這變數在哪，煩了很久還是不知道怎麼辦就去 google 找解答，結果才知道在 console 自己宣告就好了 `var myMissingNumberToSetToMakeTheRequest = 123` ，沒有的變數就自己命名。最後終於成功回傳物件得到提示，是一串亂碼，一開始想說是不是要到 cookie 或是 localStorage 去看，結果在 cookie 有看到 PHPSESSID ，但是好像沒什麼用? 後來想很久還是不知道，最後自暴自棄地把這段亂碼貼上 google 搜尋，原本想說會得到查無資料，結果並沒有! 這串亂碼是 SHA 值，得到 56，改 `myMissingNumberToSetToMakeTheRequest = 56` 再按一次按鈕就成功了。
