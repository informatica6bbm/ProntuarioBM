'use strict';
// https://sequelize.org/master/manual/getting-started.html
const express = require('express');
const router = express.Router();
const shell = require('shelljs');

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Prontuario BM API",
        version: "0.0.1"
    });
});

module.exports = router;
