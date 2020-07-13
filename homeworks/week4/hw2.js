/* eslint-disable no-case-declarations */
/* eslint-disable dot-notation */
const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com';
const action = process.argv[2];
const params = process.argv[3];


function getBookList() {
  const path = '/books?_limit=20';
  request.get(
    url + path,
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (error) {
        console.log('getBookList status code: ', response.statusCode);
      }
      data.forEach(element => console.log(`${element['id']} ${element['name']}`));
    },
  );
}

function readBook(id) {
  const path = `/books/${id}`;
  request.get(
    url + path,
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (error) {
        console.log('readBook status code: ', response.statusCode);
      }
      console.log(`${data['id']} ${data['name']}`);
    },
  );
}

function delBook(id) {
  const path = `/books/${id}`;
  request.del(
    url + path,
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (error) {
        console.log('delBook status code: ', response.statusCode);
      }
      console.log(`成功刪除 : ${data['id']} ${data['name']}`);
    },
  );
}

function createBook(name) {
  const path = '/books';
  request.post(
    {
      url: (url + path),
      form: { name },
    },
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (error) {
        console.log('createBook status code: ', response.statusCode);
      }
      console.log(`成功新增 : ${data['id']} ${data['name']}`);
    },
  );
}

function updateBook(id, name) {
  const path = `/books/${id}`;
  request.patch(
    {
      url: (url + path),
      form: { name },
    },
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (error) {
        console.log('updateBook status code: ', response.statusCode);
      }
      console.log(`成功更新 : ${data['id']} ${data['name']}`);
    },
  );
}

switch (action) {
  case 'list':
    getBookList();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    delBook(params);
    break;
  case 'create':
    createBook(params);
    break;
  case 'update':
    updateBook(params, process.argv[4]);
    break;
  default:
    console.log('沒有這個指令，請重新輸入');
}
