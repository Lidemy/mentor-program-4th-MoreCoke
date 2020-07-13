const request = require('request');

const url = 'https://restcountries.eu/rest/v2/name/';
const path = process.argv[2];
request.get(url + path, (error, response, body) => {
  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    console.log(e);
  }

  if (error) {
    console.log('status code: ', response.statusCode);
  }
  if (data.status === 404) {
    console.log('找不到國家資訊');
  } else {
    data.forEach((element) => {
      const info = `
      ============
      國家：${element.name}
      首都：${element.capital}
      貨幣：${element.currencies.code}
      國碼：${element.callingCodes}`;
      console.log(info);
    });
  }
});
