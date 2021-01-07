"use strict";

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (request, response) => {
  response.send(`/articles/add`);
});

articlesRouter.get(`/:id`, (request, response) => {
  response.send(`/articles/${request.params.id}`);
});

articlesRouter.get(`/category/:id`, (request, response) => {
  response.send(`/articles/category/${request.params.id}`);
});

articlesRouter.get(`/edit/:id`, (request, response) => {
  response.send(`/articles/edit/${request.params.id}`);
});

module.exports = articlesRouter;
