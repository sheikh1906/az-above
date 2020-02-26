const express = require('express');
const Router = express.Router();
const Ephemeris = require('./ephemeris.controller');

Router.route('/')
.get((req, res, next) => {
    Ephemeris.getFullEphemerisForSolarSystem().then(result => {
        res
        .status(200)
        .json(result);
    });

})
.post((req, res, next) => {

})

module.exports = Router;