## 請以自己的話解釋 API 是什麼

翻成中文是應用程式介面，這個 **介面** 會提供給我們開發者功能使用，我們必須按照介面的規定使用它的功能。

有時候自己寫程式懶的開發功能的話，我們就能找有沒有相關的 API ，去找現成的服務來用，像是今天我想在自己的電商網頁中加入地圖，好讓客戶知道我們的地址。我們就能用 google 它提供的地圖讓大家使用，我們能透過 google 地圖的 API 文件使用它所提供的功能。而 google 也能從提供 API 的服務中賺錢。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

我找到一個用貓介紹 HTTP status code 的網站 [HTTP Cats](https://http.cat/) ，有貓就給讚。

1. 450 Blocked by Windows Parental Controls : 只有 windows 系統會出現，屬於用戶端錯誤，但是會出現不是你的錯，可能是你爸媽或是伴侶搞的鬼，不想讓你偷看能紓壓的網站。

2. 429 Too Many Requests: 屬於用戶端錯誤，你送太多請求給網站了，所以對方把你現在的請求擋下來，因為有些網站不喜歡被爬蟲爬資料才會這樣做，你要花些時間等待再送出請求，這樣對方網站才會再次接收你的請求。

3. 307 Temporary Redirect: 不是你的錯，屬於重新導向錯誤，你現在的看的網站只是 **暫時** 更改網址，沒多久會改回來。跟 302 很像，302 是更改網址並給你個新的網址告訴你要到這網址才能看到你想要的網頁。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

# Restaurant Free Open API

## Introduction

All we have:

* [Get all restaurants](#Get-all-restaurants)
* [Get certain restaurant](#Get-certain-restaurant)
* [Add restaurant](#Add-restaurant)
* [Delete restaurant](#Delete-restaurant)
* [Update restaurant](#Update-restaurant)

How to start:

You can use request.js to call this API, and then receive a JSON data.

### Get all restaurants

URL: `GET https://restaurants`

Request

```js
const request = require('request');

const url = 'https://restaurant';
request(
  url,
  (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      console.log('status code: ', response.statusCode);
    }
    console.log(data);
  },
);
```

Response ( from `console.log(data);` )

```json
[
  {
    "id": 1,
    "location": "台北",
    "name": "麥當勞"
  },
  {
    "id": 2,
    "location": "桃園",
    "name": "肯德基"
  },
  {
    "id": 3,
    "location": "台東",
    "name": "歐鄉牛排"
  },
  {
    "id": 4,
    "location": "花蓮",
    "name": "賴桑壽司屋"
  }
]
```

### Get certain restaurant

URL : `GET https://restaurants/:id`

Request

```js
const request = require('request');

const url = 'GET https://restaurant/1';
request(
  url,
  (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      console.log('status code: ', response.statusCode);
    }
    console.log(data);
  },
);
```

Response  ( from `console.log(data);` )

```json
[
  {
    "id": 1,
    "location": "台北",
    "name": "麥當勞"
  }
]
```

### Add restaurant

URL :  `POST https://restaurants`

Parameters:

|Name  |Type   |Description  |
|--|----|---|
|id|Number |The identify number for the restaurant.|
|location|String |The location of the restaurant.|
|name|String |The restaurant's name.|

Request

```js
const request = require('request');

const url = 'POST https://restaurant';
request.post(
    {
      url: url,
      form: {
        "id": 5,
        "location": "台南",
        "name": "DOGA 辣椒"
      },
    },
    (error, response, body) => {
      const data = JSON.parse(body);
      if (error) {
        console.log('status code: ', response.statusCode);
      }
      console.log(data);
    },
  );
);
```

Response  ( from `console.log(data);` )

```json
[
  {
    "id": 5,
    "location": "台南",
    "name": "DOGA 辣椒"
  }
]
```

### Delete restaurant

URL :  `DELETE https://restaurants/:id`

Request

```js
const request = require('request');

const url = 'https://restaurant/3';
request.del(
    {
      url: url,
      form: { "id": 3 },
    },
    (error, response, body) => {
      const data = JSON.parse(body);
      if (error) {
        console.log('status code: ', response.statusCode);
      }
      console.log(data);
    },
  );
);
```

Response  ( from `console.log(data);` )

```json
[
  {
    "id": 3,
    "location": "台東",
    "name": "歐鄉牛排"
  }
]
```

### Update restaurant

URL :  `PATCH https://restaurants/:id`

Parameters:

|Name  |Type   |Description  |
|--|----|---|
|id|Number |The identify number for the restaurant.|
|location|String |The location of the restaurant.|
|name|String |The restaurant's name.|

Request

```js
const request = require('request');

const url = 'https://restaurant/2';
request.patch(
    {
      url: url,
      form: {
        "id": 2,
        "location": "桃園",
        "name": "達美樂"
       },
    },
    (error, response, body) => {
      const data = JSON.parse(body);
      if (error) {
        console.log('status code: ', response.statusCode);
      }
      console.log(data);
    },
  );
);
```

Response  ( from `console.log(data);` )

```json
[
  {
    "id": 2,
    "location": "桃園",
    "name": "達美樂"
  }
]
```
