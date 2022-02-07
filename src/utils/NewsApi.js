import { NEWS_URL, PROXY_URL, API_KEY, SEARCH_INT } from './constants';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}: ${res.statusText}`);
};

const date = new Date();
const last = new Date(date.getTime() - SEARCH_INT);
const day = last.getDate();
const month = last.getMonth() + 1;
const year = last.getFullYear();

const from = year + '/' + month + '/' + day;
const to = date;
const pageSize = '100';

export const getArticles = (searchWord) => {
  return fetch(
    `${PROXY_URL}?q=${searchWord}&apiKey=${API_KEY}&from=${from}&to=${to}&pageSize=${pageSize}`,
  ).then((res) => handleResponse(res));
};
