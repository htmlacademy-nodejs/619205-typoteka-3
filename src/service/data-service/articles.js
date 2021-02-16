"use strict";

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }
}

module.exports = ArticlesService;
