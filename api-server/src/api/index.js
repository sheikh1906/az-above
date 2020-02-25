const routes = require('express').Router();

routes.use('/ephemeris', require('./ephemeris/ephemeris.routes'));

module.exports = routes;