const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com/books?_limit=10';
request(
  url,
  (error, response, body) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      console.log(e);
    }
    if (error) {
      console.log('status code: ', response.statusCode);
    }
    // eslint-disable-next-line dot-notation
    data.forEach(element => console.log(`${element['id']} ${element['name']}`));
  },
);
