"use strict";

const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (request, response) => {
  response.send(`/categories`);
});

module.exports = categoriesRouter;
