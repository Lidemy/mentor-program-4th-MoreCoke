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
