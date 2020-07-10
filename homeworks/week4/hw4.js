const request = require('request');

const url = 'https://api.twitch.tv/kraken/games/top';
// const url = 'https://api.twitch.tv/kraken/games/top?limit=5'; 預設 10 筆，更改抓取數
const clientId = 'bln1yehoadgj1i6k3l7vkccwp2s7ar';
const accept = 'application/vnd.twitchtv.v5+json';
request.get(
  {
    url,
    headers: {
      'Client-ID': clientId,
      // eslint-disable-next-line quote-props
      Accept: accept,
    },
  },
  (error, response, body) => {
    const { top: data } = JSON.parse(body);
    if (error) {
      console.log('statusCode: ', response.statusCode);
    }
    data.forEach((element, index) => {
      const {
        game: { name },
        viewers,
      } = element;
      console.log(`第 ${index + 1} 名 => viewers: ${viewers}, name: ${name}`);
    });
  },
);
