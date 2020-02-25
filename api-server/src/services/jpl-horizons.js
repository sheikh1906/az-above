
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

getFullSolEphemerisForToday = async (celestialBody) => {

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let todayStr = today.toISOString().split('T')[0];
    let tomorrowStr = tomorrow.toISOString().split('T')[0];

    let url = generateJplRequestUri(JplCelestialBodies[celestialBody], todayStr, tomorrowStr, "1,9,20,23,24");

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'text/html' }
        });
        let cs_data = response.split("$$SOE")[1];
        cs_data = cs_data.split("$$EOE")[0];
        return cs_data;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullSolEphemerisForToday
};