const express = require('express');
const Router = express.Router();
const AzimuthAltitude = require('./controller');

Router.route('/:lat/:lng')
.get((req, res, next) => {
    // /api/azalt/32.962418/-96.687741
    // console.log("lat: " + req.params.lat + ", long: " + req.params.lng);
    AzimuthAltitude.getCurrentSolarAzAlt(req.params.lat, req.params.lng)
    .then(result => res.status(200).json(result));
})

module.exports = Router;