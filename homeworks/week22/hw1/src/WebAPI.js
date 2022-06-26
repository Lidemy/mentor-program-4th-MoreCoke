import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPostsByPage = (page = 1, limit = 5) => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`).then(
    (res) =>
      res.json().then((data) => ({
        total: res.headers.get('x-total-count'),
        posts: data,
      }))
  );
};

export const getPostDetail = (pid) => {
  return fetch(`${BASE_URL}/posts?id=${pid}&_expand=user`)
    .then((res) => res.json())
    .then((data) => data.pop());
};

export const postPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const signup = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};
