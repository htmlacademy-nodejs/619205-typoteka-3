"use strict";

const {Router} = require(`express`);
const indexRouter = new Router();

indexRouter.get(`/`, (request, response) => {
  response.render(`main`, {title: `Типотека`});
});

module.exports = indexRouter;
