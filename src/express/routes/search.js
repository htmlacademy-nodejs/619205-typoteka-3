"use strict";

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (request, response) => {
  response.render(`search`);
});

module.exports = searchRouter;
