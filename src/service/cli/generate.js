"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`);
const util = require(`util`);

const {ENCODING} = require(`../constants`);
const {getRandomInt, getRandomDate} = require(`../utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`../mocks`);

const readContent = async (filePath) => {
  const readFile = util.promisify(fs.readFile);

  try {
    const content = await readFile(filePath, ENCODING);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateAds = (count, sentences, titles, categories) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length)],
      createdDate: getRandomDate(),
      // Временно. Потом сделаю полноценную генерацию моков
      announce: sentences[getRandomInt(0, sentences.length)],
      fullText: sentences[0] + sentences[1],
      сategory: categories,
    }));

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    let [count] = args;
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateAds(count, sentences, titles, categories));
    const writeFile = util.promisify(fs.writeFile);

    try {
      await writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      return console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
