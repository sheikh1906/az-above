const ephemeriscontroller = require('../ephemeris/controller');
const geotopoconverter = require('radectoaltaz');

toDecimalHours = (rightascension) => {
    let raStrings = rightascension.split(' ');
    let ra = parseFloat(raStrings[0]);
    ra += (parseFloat(raStrings[1]) / 60);
    ra += (parseFloat(raStrings[2]) / 3600);
    return ra;
}

toDecimalDegrees = (declination) => {
    let decStrings = declination.split(' ');
    let dec = parseFloat(decStrings[0]);
    dec += (parseFloat(decStrings[1]) / 60);
    dec += (parseFloat(decStrings[2]) / 3600);
    return dec;
}


getCurrentSolarAzAlt = async (lat, lng) => {

    let ephemeris = [];

    try{

        ephemeris = await ephemeriscontroller.getFullEphemerisForSolarSystem();

        ephemeris.forEach(ephObject => {

            let ra = toDecimalHours(ephObject.rightascension);
            let dec = toDecimalDegrees(ephObject.declination);
            let coordinates = new geotopoconverter(ra, dec, lat, lng);

            ephObject.azimuth = coordinates.getAz();
            ephObject.altitude = coordinates.getAlt();

        });

        return ephemeris;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getCurrentSolarAzAlt
};