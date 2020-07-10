const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com/books?_limit=10';
request(
  url,
  (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      console.log('status code: ', response.statusCode);
    }
    // eslint-disable-next-line dot-notation
    data.forEach(element => console.log(`${element['id']} ${element['name']}`));
  },
);
