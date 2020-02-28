const express = require('express');
const Router = express.Router();
const Ephemeris = require('./controller');

Router.route('/')
.get((req, res, next) => {
    Ephemeris.getFullEphemerisForSolarSystem().then(result => {
        res
        .status(200)
        .json(result);
    });

});

Router.route('/:date')
.get((req, res, next) => {
    Ephemeris.getFullEphemerisForSolarSystem(req.params.date).then(result => {
        res
        .status(200)
        .json(result);
    });

});

module.exports = Router;