"use strict";

const PORT = 8080;

const path = require(`path`);

const express = require(`express`);
const app = express();

const indexRoutes = require(`./routes`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const searchRoutes = require(`./routes/search`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const categoriesRoutes = require(`./routes/categories`);


app

    .set(`views`, path.join(__dirname, `views`))
    .set(`view engine`, `pug`)
    .use(express.static(path.join(__dirname, `public`)))
    .use(express.json())
    .use(indexRoutes)
    .use(`/register`, registerRoutes)
    .use(`/login`, loginRoutes)
    .use(`/search`, searchRoutes)
    .use(`/my`, myRoutes)
    .use(`/articles`, articlesRoutes)
    .use(`/categories`, categoriesRoutes)
    .listen(PORT);
