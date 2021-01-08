"use strict";

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (request, response) => {
  response.send(`/search`);
});

module.exports = searchRouter;
