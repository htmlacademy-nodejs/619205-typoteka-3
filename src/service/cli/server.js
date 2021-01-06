"use strict";

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DEFAULT_PORT, HttpCode} = require(`../constants`);
const {FILE_NAME} = require(`../mocks`);

const notFoundMessageText = `Not found`;

const sendResponse = (response, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  response.statusCode = statusCode;
  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
};

const onClientConnect = async ({url}, response) => {
  switch (url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
