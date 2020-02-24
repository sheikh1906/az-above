import Ephemeris from './ephemeris';

import JPLHorizonsService from '../../services/jpl-horizons';

const solarSystemBodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

getFullEphemerisForSolarSystem = () => {

    ephemerisArray = [];
    promiseArray = [];

    solarSystemBodies.forEach(element => {
            promiseArray.push(
                JPLHorizonsService.getFullSolEphemerisForToday(element)
                .then(eData => {
                    ephemerisArray.push({ element : eData });
                })
            );
    });

    Promise.all(promiseArray)
    .then((result) =>{        
        return ephemerisArray;
    });
}