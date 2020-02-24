const express = require('express');
const Router = express.Router();
const Ephemeris = require('./ephemeris.controller');

Router.route('/')
.get((req, res, next) => {
    res
    .status(200)
    .json(Ephemeris.getFullEphemerisForSolarSystem());
})
.post((req, res, next) => {

})

module.exports = Router;