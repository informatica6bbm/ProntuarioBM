'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const batalhao = require('./routes/batalhao-routes');
const escala = require('./routes/escala-routes');
const hierarquia = require('./routes/hierarquia-routes');
const setor = require('./routes/setor-routes');
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
app.use('/escala', escala);

module.exports = app;
