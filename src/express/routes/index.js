"use strict";

const {Router} = require(`express`);
const indexRouter = new Router();

indexRouter.get(`/`, (request, response) => {
  response.send(`/`);
});

module.exports = indexRouter;
