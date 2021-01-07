"use strict";

const PORT = 8080;

const express = require(`express`);
const app = express();

const indexRoutes = require(`./routes`);
const registerRouter = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const searchRoutes = require(`./routes/search`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const categoriesRoutes = require(`./routes/categories`);

app
    .use(indexRoutes)
    .use(`/register`, registerRouter)
    .use(`/login`, loginRoutes)
    .use(`/search`, searchRoutes)
    .use(`/my`, myRoutes)
    .use(`/articles`, articlesRoutes)
    .use(`/categories`, categoriesRoutes)
    .use(express.json())
    .listen(PORT);
