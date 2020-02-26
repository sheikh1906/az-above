const JPLHorizonsService = require('../../services/jpl-horizons');
const Ephemeris = require('./ephemeris');

const solarSystemBodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

getFullEphemerisForSolarSystem = () => {
    
    ephemerisArray = [];
    promiseArray = [];

    solarSystemBodies.forEach(element => {
            promiseArray.push(
                JPLHorizonsService.getFullSolEphemerisForToday(element)
                .then(eData => {
                    ephemerisArray.push({ [element] : eData });
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