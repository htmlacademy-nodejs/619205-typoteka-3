"use strict";

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (request, response) => {
  response.render(`new-post`);
});

articlesRouter.get(`/:id`, (request, response) => {
  const {id} = request.params;
  response.render(`post`, {id});
});

articlesRouter.get(`/category/:id`, (request, response) => {
  response.render(`articles-by-category`);
});

articlesRouter.get(`/edit/:id`, (request, response) => {
  response.send(`/articles/edit/${request.params.id}`);
});

module.exports = articlesRouter;
