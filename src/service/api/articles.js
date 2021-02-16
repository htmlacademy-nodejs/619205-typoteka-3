"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);


module.exports = (app, service) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });
};
