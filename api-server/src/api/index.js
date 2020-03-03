const routes = require('express').Router();

routes.use('/ephemeris', require('./ephemeris/routes'));
routes.use('/azalt', require('./azalt/routes'));

module.exports = routes;