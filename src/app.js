'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const pessoa = require('./routes/pessoa-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

app.use('/', index);
app.use('/pessoa', pessoa);

module.exports = app;
