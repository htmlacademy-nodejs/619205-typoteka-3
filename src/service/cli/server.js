"use strict";

const express = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DEFAULT_PORT} = require(`../constants`);
const {FILE_NAME} = require(`../mocks`);
const {Router} = express;

const onPostsReceiving = async (request, response) => {
  let mocks = [];

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    mocks = JSON.parse(fileContent);
  } catch (err) {
    console.error(chalk.red(err));
  }

  response.send(mocks);
};

const router = new Router();
router.get(`/posts`, onPostsReceiving);

module.exports = {
  name: `--server`,
  run(args) {
    const app = express();

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
    .use(router)
    .use(express.json())
    .listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
