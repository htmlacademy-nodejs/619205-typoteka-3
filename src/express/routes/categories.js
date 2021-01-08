"use strict";

const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (request, response) => {
  response.render(`all-categories`);
});

module.exports = categoriesRouter;
