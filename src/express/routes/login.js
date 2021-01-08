"use strict";

const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (request, response) => {
  response.render(`login`);
});

module.exports = loginRouter;
