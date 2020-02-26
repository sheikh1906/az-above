const routes = require('express').Router();

routes.use('/ephemeris', require('./ephemeris/routes'));
routes.use('/topocentric', require('./topocentric/routes'));

module.exports = routes;