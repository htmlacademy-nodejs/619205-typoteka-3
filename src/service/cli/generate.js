"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {ENCODING} = require(`../constants`);
const {getRandomInt, getRandomDate, shuffle} = require(`../utils`);
const {
  DEFAULT_COUNT,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH
} = require(`../mocks`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, ENCODING);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateAds = (count, sentences, titles, categories, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length)],
      createdDate: getRandomDate(),
      // Временно. Потом сделаю полноценную генерацию моков
      announce: sentences[getRandomInt(0, sentences.length)],
      fullText: sentences[0] + sentences[1],
      сategory: categories,
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    }));

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const rawMocks = await Promise.all([
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    let [count] = args;
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateAds(count, ...rawMocks));

    try {
      await fs.writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      return console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
