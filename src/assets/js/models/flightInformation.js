/**
 * Model for flight information
 * @author Marc Specht
 */
class FlightInformation {
    /**
     * Creates an instance of flight information object
     * @param flightNumber Flight number
     * @param ArrivalDateTime Arrival Date
     * @param tempOutside Airplane outside temperature
     * @param tempInside Airplane inside temperature
     * @param currentLocation Airplane current location (Long-Lat)
     * @param departureLocation Departure location (Long-Lat)
     * @param arrivalLocation Arrival location (Long-Lat)
     * @param departureName Name of the departure location
     * @param arrivalName Name of the arrival location
     * @author Marc Specht
     * @public
     */
    constructor(flightNumber, ArrivalDateTime, tempOutside ,tempInside, currentLocation, departureLocation, arrivalLocation, departureName, arrivalName) {
        flightNumber = "TUL001";
        ArrivalDateTime = new Date(2020, 5, 4, 15, 33);
        tempOutside = -25;
        tempInside = 20;
        currentLocation = [3.764167, 47.308056];

        // Schiphol Airport
        // Departure name is not used but could be used for future purposes
        departureName = "Amsterdam Schiphol Airport";
        departureLocation = [4.764167, 52.308056];

        // Lloret de Mar
        // Arrival name is not used but could be used for future purposes
        arrivalName = "Airport Girona-Costa Brava";
        arrivalLocation = [2.7563, 41.9005];

        this._flightNumber = flightNumber;
        this._ArrivalDateTime = ArrivalDateTime;
        this._tempOutside = tempOutside;
        this._tempInside = tempInside;
        this._currentLocation = currentLocation;
        this._departureLocation = departureLocation;
        this._arrivalLocation = arrivalLocation;
        this._departureName = departureName;
        this._arrivalName = arrivalName;
    }

    get departureLocation() {
        return this._departureLocation;
    }

    get arrivalLocation() {
        return this._arrivalLocation;
    }

    get currentLocation() {
        return this._currentLocation;
    }

    get flightNumber() {
        return this._flightNumber;
    }

    get ArrivalDateTime() {
        return this._ArrivalDateTime;
    }

    get tempOutside() {
        return this._tempOutside;
    }

    get tempInside() {
        return this._tempInside;
    }

    get departureName() {
        return this._departureName;
    }

    get arrivalName() {
        return this._arrivalName;
    }
}