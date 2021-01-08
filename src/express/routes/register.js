"use strict";

const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (request, response) => {
  // TODO: позже выделить в собственную часть регистрации
  response.render(`login`);
});

module.exports = registerRouter;
