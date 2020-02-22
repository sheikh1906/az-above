
const JplHorizonsService = {
    getFullSolEphemerisForToday
};

const JplCelestialBodies = {
    Sun: { id: "10" },
    Moon: { id: "301" },
    Mercury: { id: "199" },
    Venus: { id: "299" },
    Mars: { id: "499" },
    Jupiter: { id: "599" },
    Saturn: { id: "699" },
    Uranus: { id: "799" },
    Neptune: { id: "899" },
    Pluto: { id: "999" }
};

const JplCelestialBodies = {};
const ObserverLocation = { Geocentric: "500", Topocentric: { latitude: null, longitude: null } };
const TimeSpan = { Start: null, Stop: null, Step: "1 d" }
const Output = "plain text";

generateJplRequestUri = (celestialBodyId, startDate, stopDate, selectFieldCodes) => {
    urlComponent1 = "https://ssd.jpl.nasa.gov";
    urlComponent2 = "/horizons_batch.cgi";
    queryString = "?batch=1";

    queryString += "&COMMAND='" + celestialBodyId + "'&MAKE_EPHEM='YES'&TABLE_TYPE='OBSERVER'";
    queryString += "&START_TIME='" + startDate + "'&STOP_TIME='" + stopDate + "'";
    queryString += "&STEP_SIZE='1%20d'";
    queryString += "&QUANTITIES='" + selectFieldCodes + "'&CSV_FORMAT='YES'";

    return urlComponent1 + urlComponent2 + queryString;
}

getFullSolEphemerisForToday = (celestialBody) => {

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let todayStr = today.toISOString().split('T')[0];
    let tomorrowStr = tomorrow.toISOString().split('T')[0];

    let url = generateJplRequestUri(JplCelestialBodies[celestialBody], todayStr, tomorrowStr, "1,9,20,23,24");

    fetch(url, { 
        method: 'GET',
        headers: { 'Accept': 'text/html' }
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
}

module.exports = JplHorizonsService;


// #!/usr/bin/perl
// #
// # Sample Perl script for use with JPL's Horizons web-based batch interface.
// # Written 2006-Mar-02 by Alan B. Chamberlin (JPL/Caltech)
// #
// # Use of this script is at your own risk.
// #
// use strict;
// use LWP::UserAgent;

// my @data = ();

// # Load the input batch file:
// while (<>)
// {
//   #
//   # Skip comments:
//   next if (/^ *!/);
//   #
//   # Strip off trailing line-endind:
//   chomp;
//   #
//   # Remove any spaces surrounding '=' for compactness:
//   s/ *= */=/;
//   #
//   # Escape special URL characters (there may be others required as well):
//   s/ /%20/g;
//   s/\&/%26/g;
//   s/;/%3B/g;
//   s/\?/%3F/g;
//   #
//   # Store the modified command:
//   push @data, $_;
// }

// # Assemble the URL:
// my $url = 'https://ssd.jpl.nasa.gov/';
// $url .= 'horizons_batch.cgi?batch=1&';
// $url .= join('&', @data);

// # Setup the HTTP objects.
// my $ua = new LWP::UserAgent;
// my $req = new HTTP::Request;

// # Send the URL:
// $req->method("GET");
// $req->url($url);
// my $res = $ua->request($req);
// die "$url\n" . $res->status_line . "\n" if ( $res->is_error );

// # Display the results:
// print $res->content;
