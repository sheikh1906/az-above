const JPLHorizonsService = require('../../services/jpl-horizons');
const Ephemeris = require('./model');

const solarSystemBodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

getFullEphemerisForSolarSystem = (date) => {
    
    let dateString = date || null;
    ephemerisArray = [];
    promiseArray = [];

    solarSystemBodies.forEach(element => {
            promiseArray.push(
                JPLHorizonsService.getFullSolEphemeris(element, dateString)
                .then(eData => {
                    ephemerisArray.push(eData);
                })
            );
    });

    return Promise.all(promiseArray)
    .then((result) =>{        
        return ephemerisArray;
    });
}

module.exports = {
    getFullEphemerisForSolarSystem
};