"use strict";

const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (request, response) => {
  response.send(`/register`);
});

module.exports = registerRouter;
