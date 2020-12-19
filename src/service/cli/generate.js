"use strict";

const fs = require(`fs`);
const {getRandomInt, getRandomDate} = require(`../utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  titles,
  sentences,
  categories,
} = require(`../mocks`);

const generateAds = (count) =>
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
  run(args) {
    console.log(args);
    let [count] = args;
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const content = JSON.stringify(generateAds(count));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  },
};
