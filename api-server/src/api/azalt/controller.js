const geotopoconverter = require('../../services/radectoaltaz');

getAzimuthAndAltitudeForLocationAndTime = (ra, dec, lat, lng) => {

    return coordinates = new geotopoconverter(ra, dec, lat, lng);

}

module.exports = {
    getAzimuthAndAltitudeForLocationAndTime
};