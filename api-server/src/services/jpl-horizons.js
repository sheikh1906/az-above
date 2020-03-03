
const fetch = require('node-fetch');

const JplCelestialBodies = {
    Sun: "10",
    Moon: "301",
    Mercury: "199",
    Venus: "299" ,
    Mars:  "499",
    Jupiter: "599",
    Saturn: "699",
    Uranus: "799",
    Neptune: "899",
    Pluto:  "999"
};

// const JplCelestialBodies = {};
const ObserverLocation = { Geocentric: "500", Topocentric: { latitude: null, longitude: null } };
const TimeSpan = { Start: null, Stop: null, Step: "1 d" }
const Output = "plain text";

generateJplRequestUri = (celestialBody, startDate, stopDate, selectFieldCodes) => {
    urlComponent1 = "https://ssd.jpl.nasa.gov";
    urlComponent2 = "/horizons_batch.cgi";
    queryString = "?batch=1";

    queryString += "&COMMAND='" + celestialBody + "'&MAKE_EPHEM='YES'&TABLE_TYPE='OBSERVER'";
    queryString += "&START_TIME='" + startDate + "'&STOP_TIME='" + stopDate + "'";
    queryString += "&STEP_SIZE='1%20d'";
    queryString += "&QUANTITIES='" + selectFieldCodes + "'&CSV_FORMAT='YES'";

    return urlComponent1 + urlComponent2 + queryString;

    // SAMPLE URL
    // https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&COMMAND=%27301%27&MAKE_EPHEM=%27YES%27&TABLE_TYPE=%27OBSERVER%27&START_TIME=%272020-02-24%27&STOP_TIME=%272020-02-25%27&STEP_SIZE=%271%20d%27&QUANTITIES=%271,9,20,23,24%27&CSV_FORMAT=%27YES%27
}

parseEphemerisFile = (eFile) => {
    // console.log(eFile);
    let ephArray = eFile.split('\n');
    let headersArray = [];
    let dataArray = [];
    let ephemeris = {};
    let data = false;

    for(let i = 0; i < ephArray.length; i++) {

        let element = ephArray[i];
        // console.log(element);

        // PARSE HEADERS
        if(element.trim().startsWith("Date")){
            let headerArray = element.split(',').map(item => item.trim());
            headerArray.forEach(header => {
                if (header.length > 0){
                    // console.log(header);
                    headersArray.push(header);
                }
            });
        }
        if(element.startsWith("$$SOE")){
            data = true;
            continue;
        }
        if(data){
            let infoArray = element.split(',').map(item => item.trim());
            infoArray.forEach(datum => {
                if(datum.length > 0){
                    // console.log(datum);
                    dataArray.push(datum);
                }
            });
            data = false;
        }
        if(element.startsWith("$$EOE")){
            break;
        }
    }

    if(headersArray.length == dataArray.length){
        headersArray.forEach((hdr,index) => {
            ephemeris[hdr] = dataArray[index];
        });
        return ephemeris;
    }
    else {
        return "ERROR";
    }
}

getFullSolEphemeris = async (celestialBody, date) => {

    let todayStr, tomorrowStr = "";

    let today = date ? new Date(date) : new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    todayStr = today.toISOString().split('T')[0];
    tomorrowStr = tomorrow.toISOString().split('T')[0];

    let url = generateJplRequestUri(JplCelestialBodies[celestialBody], todayStr, tomorrowStr, "1,9,20,23,24");

    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'text/html' }
        });

        let data = await resp.text();

        if (data && data.length > 0){
            return parseEphemerisFile((data.split("Comma Separated Values (spreadsheet)")[1]).split("Column meaning:")[0]);
        }
        else {
            return "NO DATA";
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullSolEphemeris
};