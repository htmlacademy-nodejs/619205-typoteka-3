"use strict";

const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (request, response) => {
  response.send(`/login`);
});

module.exports = loginRouter;
