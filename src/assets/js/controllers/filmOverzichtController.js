/**
 * Deze const is een Array gevuld met films en alle informatie die daar bij hoort. Dit moet nog overschreven
 * worden naar een JSON bestand.
 *
 * @type {*[]}
 */
// TODO: Probably turn this into a JSON file.
const FILMS = [
    {
        title: "Tulip Air introduction",
        icon: "eyf1.jpg",
        age: "All ages!",
        duration: "1m 11s",
        genres: "Introduction video",
        actors: "Marc Specht",
        link: "eyf.mp4",
    },
    {
        title: "A Scanner Darkly (2006)",
        icon: "AScannerDarkly.jpg",
        age: "12+",
        duration: "1h 40m",
        genres: "Animation - Crime - Drama",
        actors: "Keanu Reeves, Winona Ryder, Robert Downey Jr.",
        link: "A Scanner Darkly (2006) Official Trailer.mp4",

    }
    // {
    //     title: "Freaks (2018)",
    //     icon: "Freaks.jpg",
    //     age: "18+",
    //     duration: "1h 45m",
    //     genres: "Drama, Mystery, Sci-Fi",
    //     actors: "Emile Hirsch, Bruce Dern, Grace Park",
    //     link: "",
    // },
    // {
    //     title: "Joker (2019)",
    //     icon: "Joker.jpg",
    //     age: "16+",
    //     duration: "2h 2m",
    //     genres: "Crime, Drama, Thriller",
    //     actors: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
    //     link: "",
    // },
    // {
    //     title: "Penoza: The Final Chapter (2019)",
    //     icon: "Penoza.jpg",
    //     age: "",
    //     duration: "1h 56m",
    //     genres: "Crime, Drama, Thriller",
    //     actors: "Tygo Gernandt, Greg Lawson, Monic Hendrickx",
    //     link: "",
    // },
    // {
    //     title: "Us (2019)",
    //     icon: "Us.jpg",
    //     age: "16+",
    //     duration: "1h 56m",
    //     genres: "Horror, Mystery, Thriller",
    //     actors: "Lupita Nyong'o, Winston Duke, Elisabeth Moss",
    //     link: "",
    // }
];

/**
 * This class loads the 'filmOverzicht' view.
 * @author Kenneth Mensah & Noah Visser
 * @extends Controller
 */
class FilmOverzichtController extends Controller {

    constructor() {
        super("views/filmoverzicht.html");

    }

    /**
     * @author Kenneth Mensah & Noah Visser
     *
     * This method loads all movies in the array.
     *
     * @param data The View
     */
    setup(data) {
        $(".content").empty().append($(data));


        let filmContainer = $(".movie-overview-row"); // the overview row in html

        for (let i = 0; i < FILMS.length; i++) {
            let filmBox = filmContainer.find(".movie-overview-template").clone().removeClass("movie-overview-template");

            filmBox.find("img").attr("src", "./assets/img/films/" + FILMS[i].icon);
            filmBox.data("ID", i);
            filmBox.click(() => this.descriptionLoad(i));
            filmContainer.append(filmBox);

        }

        filmContainer.find(".movie-overview-template").remove();

        $('.movie-overview-description').hide();
        $('.movie-overview-preview').hide();

    }

    /**
     * @author Kenneth Mensah
     *
     * This method opens the movieOverview based on the movies index
     *
     * @param {number} index the index of the movie
     */
    descriptionLoad(index) {

        app.forceVisit("movieOverview");
        console.log(index);
        new FilmController(index);

    };


}
