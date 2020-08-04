## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

* `<pre>` : display 是 block，在這個標籤下文字中所使用的空格會全部保留不會刪減。

* `<strong>` : display 是 inline ，這個標籤下的文字會是粗體，通常用來裝重要的訊息。

* `<canvas>` : html 可以用這個標籤畫圖，或是搭配 js 作圖或是製作動畫，股票的曲線圖、圓餅圖等等的都能做。

## 請問什麼是盒模型（box modal）

可以把 css 中的所有元素想成是個盒子，盒子由外而內為 margin > border > padding > content，用生活舉例的話這些東西我覺得很像中世紀歐洲的城堡。

margin 是護城河，可以用來 **推開** 抵擋外人的入侵； border 是城牆， **隔絕** 了城內和城外的區域；padding 是城堡內的花園，**環繞** 著 content ，也就是領主住的官邸。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* `inline`: 會根據內容 content 的大小給予相對的寬高，無法另外設定寬高長度，也無法設定 margin ，雖然能設定 padding ，但行為會很奇怪，只有 padding-left 和 padding-right 會影響 content 位置，而 padding-top 和 padding-bottom 不會影響 content 位置。

* `block`: 不管 content 會將寬度 100% 撐滿當前的瀏覽器視窗，可以設定寬高長度。

* `inline-block`: 結合 inline 和 block 的特性，根據 content 大小給予相對的寬高，也能設定寬高長度，不過 inline-block 元素在並排時會出現小縫隙，這算是它的特性，附上 [範例](https://codepen.io/moreCoke/pen/LYGwRQJ) 和解決方法。

在 FE101 切版實戰 18:14 左右有提到 inline-block 縫隙的問題，忘記能回去看。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* `static`: position 的預設，不會有特別行為。

* `relative`: 相對位置，以原本的位置為基準進行相對應的移動，假設我設定 `top:10px`，意思就是現在的位置距離原本位置最上方的 top 有 10px 的距離，元素不管移動到哪裡其所占的空間都還會是 **原本尚未移動的位置** 而非移動後的位置。

* `absolute`: 絕對定位，會根據父元素(或是父元素上層)且 position **非 static** 的元素定位，此元素原本所佔的空間會被移除，也就是說原本排在後面的元素，會往上排把這空間補滿。可以把設定 absolute 的元素想成是貼在筆記本 (html) 上的便利貼，並不會因為貼上便利貼而影響原本寫在本子上的內容，把本子上被便利貼蓋住的底下內容往外撐開。

* `fixed`: 另一種便利貼，不同的是貼在名為 **瀏覽器視窗** 的筆記本，根據其定位。

* `sticky`: 很好玩的屬性，跟 fixed 很像，不同的是滑鼠滾輪滾過該元素時，該元素會卡在瀏覽器頁面的最上方，詳情可看該篇 [文章](https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46) 。
