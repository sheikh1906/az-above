const express = require('express');
const Router = express.Router();
const AzimuthAltitude = require('./controller');

Router.route('/:lat/:long')
.get((req, res, next) => {

})

module.exports = Router;