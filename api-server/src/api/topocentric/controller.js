toDegrees = (radians) => {
    return radians * (180 / Math.PI);
}

toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

getAzimuthAndAltitudeForLocationAndTime = (RA, DEC, GLat, GLong) => {

    let az, alt = null;
    h = gst(d) + GLong - RA;
    sa = Math.sin(toRadians(DEC)) * Math.sin(toRadians(GLat));
    sa = sa + Math.cos(toRadians(DEC)) * Math.cos(toRadians(GLat)) * Math.cos(toRadians(h));
    a = Math.asin(sa);
    cz = Math.sin(toRadians(DEC)) - Math.sin(toRadians(GLat)) * sa;
    cz = cz / (Math.cos(toRadians(GLat)) * Math.cos(toRadians(a)));

    az = toDegrees(a);
    alt =  (Math.sin(toRadians(h)) < 0) ? toDegrees(Math.acos(cz)) : (360 - toDegrees(Math.acos(cz)));

    return { azimuth: az, altitude: alt };
}

module.exports = {
    getAzimuthAndAltitudeForLocationAndTime
};


// ' returns altitude and azimuth of object given RA and DEC of
// ' object, latitude and longitude of observer and days after
// ' J2000.0 From Practial Astronomy with your calculator, 2nd edition eq 25, Peter Duffett-Smith

// Function altaz(d As Double, DEC As Double, RA As Double, _
// GLat As Double, GLong As Double, Index As Integer) As Double
// Dim h As Double, lst As Double, a As Double, z As Double, _
// sa As Double, cz As Double
// h = gst(d) + GLong - RA
// sa = DegSin(DEC) * DegSin(GLat)
// sa = sa + DegCos(DEC) * DegCos(GLat) * DegCos(h)
// a = DegArcsin(sa)
// cz = DegSin(DEC) - DegSin(GLat) * sa
// cz = cz / (DegCos(GLat) * DegCos(a))
// Select Case Index
// Case 1  'altitude
//     altaz = a
// Case 2  'azimuth
//     If DegSin(h) < 0 Then
//     altaz = DegArccos(cz)
//     Else
//     altaz = 360 - DegArccos(cz)
//     End If
// End Select
// End Function

// ' calculates the time of rise and set of the planets given
// ' days after J2000.0, planet number and longitude and latitude
// ' of observer
// Function prise(d As Double, P As Integer, GLat As Double, _
// GLong As Double, Index As Integer) As Double
// Dim lst As Double, tau As Double, RA As Double, DEC As Double, _
// ut0 As Double, ut1 As Double, slt As Double, clt As Double, _
// flag As Integer, count As Integer
// count = 0
// flag = 2 - Index
// ut0 = 0
// ut1 = 180
// slt = DegSin(GLat)
// clt = DegCos(GLat)
// Do While Abs(ut0 - ut1) > 0.1 And count < 10
//  count = count + 1
//  ut0 = ut1
//  DEC = planet(d + ut0 / 360, P, 2)
//  RA = planet(d + ut0 / 360, P, 3)
//  tau = (-0.009890037858741 - slt * DegSin(DEC)) / (clt * DegCos(DEC))
//  Select Case tau
//  Case Is >= 1
//     tau = 180
//  Case Is <= -1
//     tau = -180
//  Case Else
//     tau = DegArccos(tau)
//  End Select
//  lst = gst(d + ut0 / 360) + GLong
//  ut1 = range360(ut0 - 0.9972696 * (lst - RA + flag * tau))
// Loop
// prise = ut1
// End Function

// ' returns siderial time at longitude zero given days
// ' after J2000.0
// Function gst(days As Double) As Double
// Dim T As Double
// T = days / 36525
// gst = 280.46061837 + 360.98564736629 * days
// gst = gst + 0.000387933 * T ^ 2 - T ^ 3 / 38710000
// gst = range360(gst)
// End Function