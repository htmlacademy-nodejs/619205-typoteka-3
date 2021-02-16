'use strict';

const {Router} = require(`express`);

const getMockData = require(`../lib/get-mock-data`);
const articles = require(`../api/articles`);
const {
  ArticlesService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  articles(app, new ArticlesService(mockData));
})();

module.exports = app;
