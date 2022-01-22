import { NEWS_URL, PROXY_URL, API_KEY, SEARCH_INT } from './constants';

class NewsApi {
  constructor(optionsObj) {
    this.headers = optionsObj.headers;
    this.apiKey = optionsObj.apiKey;
    this.currentDay = optionsObj.currentDay;
    this.lastWeek = optionsObj.lastWeek;
    this.newsURL = optionsObj.newsUrl;
    this.practiUrl = optionsObj.practiUrl;
  }

  getArticles(searchWord) {
    return fetch(
      `${this.newsURL}/v2/everything?q=${searchWord}` +
        `&from=${this.lastWeek.toISOString()}` +
        `&to=${this.currentDay.toISOString()}` +
        `&sortBy=popularity&pageSize=100&apiKey=${this.apiKey}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data.articles);
  }
}

const newsApi = new NewsApi({
  newsURL: NEWS_URL,
  currentDay: new Date(),
  apiKey: API_KEY,
  lastWeek: new Date(Date.now() - SEARCH_INT),
  practiUrl: PROXY_URL,
});

export default newsApi;
