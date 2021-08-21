/**
 * Flight information page controller
 * @author Marc Specht
 * @extends Controller
 */
class FlightInformtionController extends Controller {
    constructor() {
        super("views/flightInformation.html");

        // Instantiate a new flightinformation object
        this.flightInformation = new FlightInformation();
    }

    //Called when the login.html has been loaded
    setup(data) {
        //Load the login-content into memory
        this.view = $(data);
        $(".content").empty().append(this.view);

        this.applyTimeData();
        this.applyWeatherData();
        this.mapSetup();

        $('#flightNumber').html(this.flightInformation.flightNumber);

        // $('#currentCoords').html(this.flightInformation.currentLocation[0] + ", " + this.flightInformation.currentLocation[1]);
        // setInterval(() => $('#currentCoords').html(this.flightInformation.currentLocation[0] + ", " + this.flightInformation.currentLocation[1]), 1000);
    }

    /**
     * Make instance of the MapboxGL JS offline map + config
     * @author Marc Specht
     */
    mapSetup(){
        const markerColor = "#E12222";

        // Set current location
        let currentLocation = this.flightInformation.currentLocation;

        // Set arrival + departure location
        const arrivalLocation = this.flightInformation.arrivalLocation;
        const departureLocation = this.flightInformation.departureLocation;

        mapboxgl.accessToken = 'NOT-REQUIRED-WITH-YOUR-VECTOR-TILES-DATA';

        const srcPathname = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.html", "") + "assets/";

        const style = {
            "version": 8,
            "sources": {
                "countries": {
                    "type": "vector",
                    // "url": "mapbox://map-id"
                    // "url": "http://tileserver.com/layer.json",
                    "tiles": [srcPathname+"countries/{z}/{x}/{y}.pbf"],
                    "maxzoom": 6
                }
            },
            "glyphs": srcPathname+"font/{fontstack}/{range}.pbf",
            "layers": [{
                "id": "background",
                "type": "background",
                "paint": {
                    "background-color": "#ddeeff"
                }
            },{
                "id": "country-glow-outer",
                "type": "line",
                "source": "countries",
                "source-layer": "country",
                "layout": {
                    "line-join":"round"
                },
                "paint": {
                    "line-color": "#226688",
                    "line-width": 5,
                    "line-opacity": {
                        "stops": [[0,0],[1,0.1]]
                    }
                }
            },{
                "id": "country-glow-inner",
                "type": "line",
                "source": "countries",
                "source-layer": "country",
                "layout": {
                    "line-join":"round"
                },
                "paint": {
                    "line-color": "#226688",
                    "line-width": {
                        "stops": [[0,1.2],[1,1.6],[2,2],[3,2.4]]
                    },
                    "line-opacity":0.8,
                }
                // rainbow start
            },{
                "id": "area-white",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'ATA'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#F0F8FF"
                }
            },{
                "id": "area-white",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'ATA'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#F0F8FF"
                }
            },{
                "id": "area-red",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'AFG','ALD','BEN','BLR','BWA','COK','COL','DNK','DOM','ERI','FIN','FRA','FRO','GIB','GNB','GNQ','GRC','GTM','JPN','KIR','LKA','MHL','MMR','MWI','NCL','OMN','RWA','SMR','SVK','SYR','TCD','TON','URY','WLF'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#fdaf6b"
                }
            },{
                "id": "area-orange",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'AZE','BGD','CHL','CMR','CSI','DEU','DJI','GUY','HUN','IOA','JAM','LBN','LBY','LSO','MDG','MKD','MNG','MRT','NIU','NZL','PCN','PYF','SAU','SHN','STP','TTO','UGA','UZB','ZMB'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#fdc663"
                }
            },{
                "id": "area-yellow",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'AGO','ASM','ATF','BDI','BFA','BGR','BLZ','BRA','CHN','CRI','ESP','HKG','HRV','IDN','IRN','ISR','KNA','LBR','LCA','MAC','MUS','NOR','PLW','POL','PRI','SDN','TUN','UMI','USA','USG','VIR','VUT'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#fae364"
                }
            },{
                "id": "area-green",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'ARE','ARG','BHS','CIV','CLP','DMA','ETH','GAB','GRD','GRL','HMD','IND','IOT','IRL','IRQ','ITA','KOS','LUX','MEX','NAM','NER','PHL','PRT','RUS','SEN','SUR','TZA','VAT'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#d3e46f"
                }
            },{
                "id": "area-turquoise",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'AUT','BEL','BHR','BMU','BRB','CYN','DZA','EST','FLK','GMB','GUM','HND','JEY','KGZ','LIE','MAF','MDA','NGA','NRU','SLB','SOL','SRB','SWZ','THA','TUR','VEN','VGB'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#aadb78"
                }
            },{
                "id": "area-blue",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'AIA','BIH','BLM','BRN','CAF','CHE','COM','CPV','CUB','ECU','ESB','FSM','GAZ','GBR','GEO','KEN','LTU','MAR','MCO','MDV','NFK','NPL','PNG','PRY','QAT','SLE','SPM','SYC','TCA','TKM','TLS','VNM','WEB','WSB','YEM','ZWE'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#a3cec5"
                }
            },{
                "id": "area-purple",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'ABW','ALB','AND','ATC','BOL','COD','CUW','CYM','CYP','EGY','FJI','GGY','IMN','KAB','KAZ','KWT','LAO','MLI','MNP','MSR','MYS','NIC','NLD','PAK','PAN','PRK','ROU','SGS','SVN','SWE','TGO','TWN','VCT','ZAF'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#ceb5cf"
                }
            },{
                "id": "area-pink",
                "type": "fill",
                "source": "countries",
                "filter":["in","ADM0_A3",'ARM','ATG','AUS','BTN','CAN','COG','CZE','GHA','GIN','HTI','ISL','JOR','KHM','KOR','LVA','MLT','MNE','MOZ','PER','SAH','SGP','SLV','SOM','TJK','TUV','UKR','WSM'],
                "source-layer": "country",
                "paint": {
                    "fill-color": "#f3c1d3"
                }
                // rainbow end
            },{
                "id": "geo-lines",
                "type": "line",
                "source": "countries",
                "source-layer": "geo-lines",
                "paint": {
                    "line-color": "#226688",
                    "line-width": {
                        "stops": [[0,0.2],[4,1]]
                    },
                    "line-dasharray":[6,2]
                }
            },{
                "id": "land-border-country",
                "type": "line",
                "source": "countries",
                "source-layer": "land-border-country",
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base":1.5,
                        "stops": [[0,0],[1,0.8],[2,1]]
                    }
                }
            },{
                "id": "state",
                "type": "line",
                "source": "countries",
                "source-layer": "state",
                "minzoom": 3,
                "filter": ["in","ADM0_A3",'USA','CAN','AUS'],
                "paint": {
                    "line-color": "#226688",
                    "line-opacity": 0.25,
                    "line-dasharray":[6,2,2,2],
                    "line-width": 1.2
                }
                // LABELS
            },{
                "id": "country-abbrev",
                "type": "symbol",
                "source": "countries",
                "source-layer": "country-name",
                "minzoom":1.8,
                "maxzoom":3,
                "layout": {
                    "text-field": "{ABBREV}",
                    "text-font": ["Open Sans Semibold"],
                    "text-transform": "uppercase",
                    "text-max-width": 20,
                    "text-size": {
                        "stops": [[3,10],[4,11],[5,12],[6,16]]
                    },
                    "text-letter-spacing": {
                        "stops": [[4,0],[5,1],[6,2]]
                    },
                    "text-line-height": {
                        "stops": [[5,1.2],[6,2]]
                    }
                },
                "paint": {
                    "text-halo-color": "#fff",
                    "text-halo-width": 1.5
                }
            },{
                "id": "country-name",
                "type": "symbol",
                "source": "countries",
                "source-layer": "country-name",
                "minzoom":3,
                "layout": {
                    "text-field": "{NAME}",
                    "text-font": ["Open Sans Semibold"],
                    "text-transform": "uppercase",
                    "text-max-width": 20,
                    "text-size": {
                        "stops": [[3,10],[4,11],[5,12],[6,16]]
                    }
                },
                "paint": {
                    "text-halo-color": "#fff",
                    "text-halo-width": 1.5
                }
            },{
                "id": "geo-lines-lables",
                "type": "symbol",
                "source": "countries",
                "source-layer": "geo-lines",
                "minzoom":1,
                "layout": {
                    "text-field": "{DISPLAY}",
                    "text-font": ["Open Sans Semibold"],
                    "text-offset": [0,1],
                    "symbol-placement": "line",
                    "symbol-spacing": 600,
                    "text-size": 9
                },
                "paint": {
                    "text-color": "#226688",
                    "text-halo-width": 1.5
                }
            }]
        };

        const map = new mapboxgl.Map({
            container: 'map',
            center: currentLocation,
            zoom: 3,
            style: style
        });

        // Add destination markers
        map.on('load', function() {
            map.addSource('marker', {
                'type': 'geojson',
                'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            // Current location
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': currentLocation
                                }
                            },
                            // Departure location
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': departureLocation
                                }
                            },
                            // Arrival location
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': arrivalLocation
                                }
                            }
                        ]
                    }
            });

            map.addLayer({
                'id': 'marker',
                'type': 'circle',
                'source': 'marker',
                'paint': {
                    'circle-radius': 10,
                    'circle-color': markerColor
                }
            });
        });

        map.addControl(new mapboxgl.Navigation());
    }

    /**
     * Apply weather data to html
     * @author Marc Specht
     */
    applyWeatherData(){
        let temperatureOutsideCelsiusDiv = $('#temperatureOutside');
        temperatureOutsideCelsiusDiv.html(this.flightInformation.tempOutside + '&#8451;');
        setInterval(() => temperatureOutsideCelsiusDiv.html(this.flightInformation.tempOutside + '&#8451;'), 1000);

        let temperatureInsideCelsiusDiv = $('#temperatureInside');
        temperatureInsideCelsiusDiv.html(this.flightInformation.tempInside + '&#8451;');
        setInterval(() => temperatureInsideCelsiusDiv.html(this.flightInformation.tempInside + '&#8451;'), 1000);
    }

    /**
     * Apply time data to html
     * @author Marc Specht
     */
    applyTimeData(){
        this.getTime();
        setInterval(() => this.getTime(), 1000);

        // Today's date
        let dateToday = new Date();

        // Show the current time
        let timeToday = dateToday.getHours() + ":" + dateToday.getMinutes();
        console.log(timeToday);

        // Date of arrival
        let dateArrival = new Date(2020, 3, 16, 18, 0);

        // Show the date of arrival
        let arrivalTimeDiv = $('#arrivalTime');
        arrivalTimeDiv.html(this.prependZero(this.flightInformation.ArrivalDateTime.getHours()) + ":" + this.prependZero(this.flightInformation.ArrivalDateTime.getMinutes()));

        // Calculate the difference in milliseconds
        let dateDiff = Math.abs(new Date().getTime() - this.flightInformation.ArrivalDateTime.getTime());
        setInterval(() => {
            dateDiff = Math.abs(new Date().getTime() - this.flightInformation.ArrivalDateTime.getTime());
        }, 1000);

        // Show the difference in time
        let estimatingTimeDiv = $('#estimatingTime');
        estimatingTimeDiv.html(this.parseMillisecondsIntoTime(dateDiff));
        setInterval(() => estimatingTimeDiv.html(this.parseMillisecondsIntoTime(dateDiff)), 1000);
    }

    /**
     * Parses Milliseconds into readable time
     * @param {number} milliseconds amount
     * @returns {string} Hours and minutes or HH:MM (ex.: 03:18)
     * @author Marc Specht
     */
    parseMillisecondsIntoTime(milliseconds){
        //Get hours from milliseconds
        let hours = milliseconds / (1000*60*60);
        let absoluteHours = Math.floor(hours);
        let h = absoluteHours;

        //Get remainder from hours and convert to minutes
        let minutes = (hours - absoluteHours) * 60;
        let absoluteMinutes = Math.ceil(minutes);
        let m = absoluteMinutes;

        return h + ' hours, ' + m + ' minutes';
    }

    /**
     * Gets the current time and displays it in #currentTime div
     * @author Marc Specht
     */
    getTime(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = this.prependZero(minutes);
        $('#currentTime').html(hours + ":" + minutes);
    }

    /**
     * Prepends a '0' to any number below 10. (used for time display)
     * @param number the inputted number
     * @returns {string} Number with prepended '0' (zero)
     * @author Marc Specht
     */
    prependZero(number){
        if(number < 10){
            number = 0 + "" + number;
        }
        return number;
    }
}




