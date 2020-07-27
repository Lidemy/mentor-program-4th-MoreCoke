## 前四週心得與解題心得

寫這篇心得前我稍微回顧了每周學習的目標，其中最影響我的還是第零周的心態建立。會這樣說是因為我現在心態爆炸了。我七月開始上班寫前端，但現在跟不上公司的節奏也連帶影響程式計畫中的學習品質，陣痛期應該還會持續一段時間。

好像是第一周吧，有個作業是說要讓自己休息一天，別排進度或是什麼事都別做，老實說我以前沒有這個習慣，沒有特別空出一天休息的習慣，大學書念累了就直接去休息，打工回家累了就去洗澡睡覺。但是現在不一樣了，工作有時間壓力，上班卡關不會時不能看 youtube 休息，程式計畫則是要靠自制力管理自己的學習進度，我真的很不會利用時間呢，雖然以前就知道了，但一直裝沒事閃多飄混到現在。搞得現在每天都很焦慮，所有的事情都混在一起，主管客戶下班後還一直 line ，事情都做不完，覺得好可怕啊。

現在我直接不管了，不管程式計畫進度落後還是工作，我假日就是要放空一天，讓我躲一天吧!休息日當天就跟著當下感覺做事，因為我再次深刻的體會到，我真的 EQ 超低，我心情不好什麼事都做不好。反正我課程內容就照自己能吸收的量去學，工作盡量做，最後真的很不幸被開除的話，大不了再去把不足的補起來後去找其他工作。

簡單總結前四周我學到最多的東西是心態方面而非程式，學習如何冷靜 debug，心慌什麼都做不好，這段心理建設還是正在進行中。

## 解題心得

就用 HTTP Challenge 來說吧，不會每關都記錄我的 debug 流程，希望能提升日後的 debug 速度。

* [第一關](#第一關)
* [第二關](#第二關)
* [第三關](#第三關)
* [第四關](#第四關)
* [第五關](#第五關)
* [第六關](#第六關)
* [第七關](#第七關)
* [第八關](#第八關)
* [第九關](#第九關)
* [第十關](#第十關)
* [第十一關](#第十一關)
* [第十二關](#第十二關)
* [第十三關](#第十三關)
* [第十四關](#第十四關)
* [第十五關](#第十五關)

### 第一關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv1?token=%7BGOGOGO%7D&name=morecoke)

---

解答

```js
// start
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com';

request(`${url}/lv1?token={GOGOGO}`, (error, response, body) => {
  console.log(body);
});

// lv1

request(`${url}/lv1?token={GOGOGO}&name=morecoke`, (error, response, body) => {
  console.log(body);
});

```

### 第二關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld})

---

解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com';

request(`${url}/lv2?token={HellOWOrld}&id=56`, (error, response, body) => {
  console.log(body);
});

```

### 第三關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv3?token={5566NO1})

---

解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com';
const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api';

request.post(
  {
    url: `${bookUrl}/books`,
    form: { name: '大腦喜歡這樣學', ISBN: 9789863594475 },
  },
  (error, response, body) => {
    let data;
    try {
      data = JSON.parse(body);
      request(`${url}/lv3?token={5566NO1}&id=${data.id}`, (error, response, body) => {
        console.log(body);
      });
    } catch (e) {
      console.log(e);
    }
  },
);

```

### 第四關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv4?token={LEarnHOWtoLeArn})

我一開始在 request 的套件中，想先在 book 的 api 中找書，出現下方問題。

錯誤提示為 `Unexpected token u in JSON at position 0` ，整段複製貼上 google 發現這錯誤的意思是取回來的 JSON 是 undefined。

後來又看到這錯誤 `Request path contains unescaped characters`

```js
request(`${bookUrl}/books?q=世界`, (error, response, body) => {
  console.log(error);
  console.log(body);
});
```

發現是因為 api 的 query string 中有夾雜中文，根據找到的資料解決問題。

參考資料:

[TypeError [ERR_UNESCAPED_CHARACTERS] Request path contains unescaped characters](https://stackoverflow.com/questions/54025710/typeerror-err-unescaped-characters-request-path-contains-unescaped-characters)

[nodejs请求Request path contains unescaped characters](https://zhuanlan.zhihu.com/p/141608348)

丟上部分程式碼

``` js
const encodeQ = encodeURI('世界');
```

---
解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com';
const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api';

const encodeQ = encodeURI('世界');
request(`${bookUrl}/books?q=${encodeQ}`, (error, response, body) => {
  try {
    const data = JSON.parse(body);
    const { id } = data.filter(element => element.author === '村上春樹')[0];
    request(`${url}/lv4?token={LEarnHOWtoLeArn}&id=${id}`, (error, response, body) => {
      console.log(body);
    });
  } catch (e) {
    console.log(e);
  }
});
```

### 第五關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv5?token={HarukiMurakami})

---

解答

```js
const request = require('request');

const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api';
request.del(`${bookUrl}/books/23`, (error, response, body) => {
  console.log(body);
});

```

### 第六關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv6?token={CHICKENCUTLET})

我一開始看不懂文件，我不知道 Header 要加的東西，我先去看 http basic authorization 相關的[文章](https://carsonwah.github.io/http-authentication.html)，文章資訊量大，掃過一遍還是看不懂，回去讀 v2 的文件看到 `Authorization: Basic YWFhOjEyMw==`，這組字，我一開始先複製下來用 node 跑一次

```js
request({
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/me',
  headers: {
    Authorization: 'Basic YWFhOjEyMw==',
  },
}, (error, response, body) => {
  console.log(body);
});
```

得到 `Invalid Authorization token` ， 後來還是沒頭緒去看其他人的作業，看自己哪裡有問題，發現是轉 base64 轉字串問題，要轉 `admin:admin123` 才對，所以又要 google `node base64`，找到 [解決方法](https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js)。

```js
const base64Str = Buffer.from('admin:admin123').toString('base64');
```

接下來就解決啦。

---
解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com';
const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api/v2';
const base64Str = Buffer.from('admin:admin123').toString('base64');
request({
  url: `${bookUrl}/me`,
  headers: {
    Authorization: `Basic ${base64Str}`,
  },
}, (error, response, body) => {
  const { email } = JSON.parse(body);
  request(`${url}/lv6?token={CHICKENCUTLET}&email=${email}`, (error, response, body) => {
    console.log(body);
  });
});
```

### 第七關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv7?token={SECurityIsImPORTant})

這題單純是自己粗心，題目是要 delete 而不是發 get 請求。

原本寫這樣。

```js
const base64Str = Buffer.from('admin:admin123').toString('base64');
request(

);
```

改成 del 就好。

```js
const base64Str = Buffer.from('admin:admin123').toString('base64');
request.del(

);
```

---
解答

```js
const request = require('request');

const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api/v2';
const base64Str = Buffer.from('admin:admin123').toString('base64');
request.del(
  {
    url: `${bookUrl}/books/89`,
    headers: {
      Authorization: `Basic ${base64Str}`,
    },
  },
  (error, response, body) => {
    console.log(body);
  },
);

```

### 第八關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv8?token={HsifnAerok})

特別紀念這關卡了一小時。

```js
const request = require('request');

const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api/v2';
const base64Str = Buffer.from('admin:admin123').toString('base64');
const encodeQ = encodeURI('我');
request(
  {
    url: `${bookUrl}/books?q=${encodeQ}`,
    headers: {
      Authorization: `Basic ${base64Str}`,
    },
  },
  (error, response, body) => {
    try {
      const data = JSON.parse(body);
      const book = data.filter(element => element.author.length === 4 && element.ISBN[element.ISBN.length - 1] === '7')[0];
      const newIsbn = `${book.ISBN.slice(0, -1)}3`;
      const options = {
        url: `${bookUrl}/books/${book.id}`,
        headers: {
          Authorization: `Basic ${base64Str}`,
        },
        ISBN: newIsbn,
      };
      request.patch(options, (error, response, body) => {
        console.log(body);
      });
    } catch (e) {
      console.log('error');
    }
  },
);
```

得到的回覆一直是 `{"message":"更新失敗"}` ，我 debug 的方向搞錯，我一直以為是我的 newIsbn 出錯或是 `book.id` 有問題，但怎麼 console.log 最後都發現值是對的阿，**那到底哪裡有問題啊?**

冷靜下來後，發現 api 是有發成功的，如果發失敗是會直接跳錯的，所以我又再去檢查是不是我格式有寫錯，後來看其他人的作業解答一行行看比對發現沒有加 `form` ，結果幹還是錯，再去重看比對別人的 code，敗在字串轉型，我的 newIsbn 是 `string`，但是 form 中的 ISBN 是接收 `number`，最後終於解決了。

從這件是我學到在接 api 時得到錯誤資料而非報錯時，要先檢查自己傳參數的格式有沒有寫對，再來要注意參數的資料型態的問題。

---
解答

```js
const request = require('request');

const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api/v2';
const base64Str = Buffer.from('admin:admin123').toString('base64');
const encodeQ = encodeURI('我');
request(
  {
    url: `${bookUrl}/books?q=${encodeQ}`,
    headers: {
      Authorization: `Basic ${base64Str}`,
    },
  },
  (error, response, body) => {
    try {
      const data = JSON.parse(body);
      const book = data.filter(element => element.author.length === 4 && element.ISBN[element.ISBN.length - 1] === '7')[0];
      const newIsbn = Number(`${book.ISBN.slice(0, -1)}3`);
      const options = {
        url: `${bookUrl}/books/${book.id}`,
        headers: {
          Authorization: `Basic ${base64Str}`,
        },
        ISBN: newIsbn,
      };
      request.patch(options, (error, response, body) => {
        console.log(body);
      });
    } catch (e) {
      console.log('error');
    }
  },
);
```

### 第九關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN})

這題就 google 找 user-agent ie 找到 [資料](https://developers.whatismybrowser.com/useragents/explore/software_name/internet-explorer/) 。

---
解答

```js
const request = require('request');

const bookUrl = 'https://lidemy-http-challenge.herokuapp.com/api/v2';
const base64Str = Buffer.from('admin:admin123').toString('base64');
request(
  {
    url: `${bookUrl}/sys_info`,
    headers: {
      Authorization: `Basic ${base64Str}`,
      'X-Library-Number': 20,
      'User-agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
    },
  },
  (error, response, body) => {
    const { version } = JSON.parse(body);
    const url = `https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN}&version=${version}`;
    request(url, (error, response, body) => {
      console.log(body);
    });
  },
);

```

### 第十關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA})

這關我用程式碼鑽漏洞，題目說答案是不同的數字，但沒有規定玩家一定每次都要猜 **四個不同的數字** ，所以我很暴力的用 0000 ~ 9999 字串跑迴圈去要找有哪些數字，然後再自己去是剩下的 24 種可能。我覺得程式有更好的寫法但我想不到。

---
解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}&num=';

let ans = '';
for (let i = 0; i <= 9; i += 1) {
  const num = `${i}`.repeat(4);
  request(
    (url + num),
    // eslint-disable-next-line no-loop-func
    (_error, _repsonse, body) => {
      ans += body.includes('1A') ? i : '';
      console.log(ans);
    },
  );
}

```

### 第十一關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv11?token={IhateCORS})

這題送請求時沒有加 headers: {} 把 Origin 包起來，卡了半小時。

---
解答

```js
const request = require('request');

const url = 'https://lidemy-http-challenge.herokuapp.com/api/v3';

request({
  headers: {
    Origin: 'https://lidemy.com'
  },
  url: `${url}/hello`
}, (error, response, body)=> {
  console.log(body);
})

```

### 第十二關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv12?token={r3d1r3c7})

直接在瀏覽器上看開發者工具 Network 的部分。

---
解答

```js
無
```

### 第十三關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv13?token={qspyz})

我用 request 測了一個多小時，用了多個 ip 位址都沒有用，後來到 slack 求救，學到可以在瀏覽器更改 ip 位址，我很好奇同學是怎麼下關鍵字找到資料的，所以就試著 查 proxy setting 就找到教學文章了，這個題目讓我學到要設定停損點，真的不會就問人，或是不要眷戀原本的方法鑽牛角尖，趕快試別的方法，執著要用原本的方法得到答案真的沒必要，那些浪費的時間可以拿來學更多東西。希望以後遇到卡很久的問題時可以更勇敢地提出來。

[ip 位址](http://free-proxy.cz/zh/proxylist/country/PH/all/ping/all)

[stackoverflow 參考資料](https://stackoverflow.com/questions/34078995/how-can-i-use-an-https-proxy-with-node-js-https-request-client)

---

附上沒測成功，一直得到 undefined 的 code

```js
const request = require('request');

const opt = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/logs',
  proxy: 'https://121.58.246.247:8080',
};

request(opt, (error, response, body) => {
  console.log(body);
});

```

### 第十四關

[問題連結](http://lidemy-http-challenge.herokuapp.com/lv14?token={SEOisHard})

這關看不懂題目，看了提示後大概知道要偽造 User Agent，所以先 google 找 user agent 關鍵字，然後看文件找到 Chrome 的字串，接著寫程式碼。

```js
const request = require('request');

const opt = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/index',
  headers: {
    'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  },
};

request(opt, (error, response, body) => {
  console.log(body);
});

```

但是沒有看到特別的東西，去開發者工具看 Network 也沒有看到 token 之類的東西。

所以我 google 重新下關鍵字找資料 : google search first page user agent，但是大概看過還是沒頭緒，所以最後直接去 google 別人分享的 http challenge [心得文](https://github.com/Lidemy/mentor-program-4th-fix-hero19931012/pull/5/files#diff-3afdd3969c449a5fd1ffbebe48691a99) 還有胡立的 [文章](https://blog.techbridge.cc/2019/05/18/behind-the-scenes-http-challenge/) ，引用胡立文中的一段話:

>這關想讓大家知道的事情是不只瀏覽器，各家爬蟲也會帶特定的 User-Agent，所以 Server 一樣可以針對不同的 UA 來輸出不同的資訊（雖然不被推薦就是了）。

```js
// base on UA return differect result
router.get('/start', (req, res) => {
  const UA = req.header('User-Agent') || ''
  if (UA.indexOf('facebookexternalhit') >= 0 || UA.indexOf('Googlebot') >= 0 ){
    res.end(text.seo)
  } else {
    res.end(text.start.intro)
  }
})
```

從文中發現我們能透過設定 User-Agent 的內容，讓 Server 回傳相對應的東西，雖然還是不太懂，但在程式碼中找到 **Googlebot** 這個跟 google 有關的線索，所以先goole 去看了 [robot 的相關介紹資料](https://www.awoo.com.tw/blog/robotstxt-crawl/) ，接著再打關鍵字 user agent googlebot 找到了 [Google 檢索器 (使用者代理程式) 總覽](https://support.google.com/webmasters/answer/1061943?hl=zh-Hant) 滑鼠往下滾找到了 Googlebot(電腦)欄位，把使用者代理程式字串的第一點`Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` 複製來用就成功要到資料了。

---

解答

```js
const request = require('request');

const opt = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/index',
  headers: {
    'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
};

request(opt, (error, response, body) => {
  console.log(body);
});

```

在課程 FE101 SEO 與相關標籤的章節中有提到 robot.txt 的基礎觀念(約在 7:47 左右)，忘記能回去看。

小心得: 其實在我第一次 google 搜尋 google search first page user agent，就已經找到 [Google 檢索器 (使用者代理程式) 總覽](https://support.google.com/webmasters/answer/1061943?hl=zh-Hant) 這個網頁了，但我當時對 googlebot 沒有概念，就當成是沒用的資訊給滑過了，常常聽到一個說法是工程師會 google 比會寫 code 還重要，但我發現有時其實自己並不是不會 google ，而是因為自己沒有相關的知識才會錯過資訊，會 google 找答案的前提是建立在基礎觀念扎實下，要成為很會 google 的工程師還有很長的路要走。

### 第十五關

[問題連結](https://lidemy-http-challenge.herokuapp.com/lv15?token={ILOVELIdemy!!!})

破關啦~

### 參考的作業

[hero19931012](https://github.com/Lidemy/mentor-program-4th-fix-hero19931012/pull/5/files?short_path=3afdd39#diff-3afdd3969c449a5fd1ffbebe48691a99)