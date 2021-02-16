"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const {DEFAULT_PORT, API_PREFIX} = require(`../constants`);
const {Router} = express;
const routes = require(`../api`);


const router = new Router();

module.exports = {
  name: `--server`,
  run(args) {
    const app = express();

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
    .use(router)
    .use(express.json())
    .use(API_PREFIX, routes)
    .listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
