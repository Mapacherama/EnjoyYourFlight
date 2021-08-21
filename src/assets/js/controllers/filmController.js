/**
 * @author Kenneth Mensah & Noah Visser
 * @extends Controller
 */
class FilmController extends Controller {

    /**
     * This class loads the movieOverview with the movies image and description.
     * @author Kenneth Mensah & Noah Visser
     */
    constructor(index) {
        super("views/film.html");
        this.index = index;
        app.setBeforeClose(() => app.forceVisit("movieView", FILMS[this.index].title));
    }

    /**
     * This method initiates when the page loads. It displays the movie and the description.
     *
     * @author Kenneth Mensah &  Noah Visser & Jerome Tesselaar
     */
    setup(data) {

        $(".content").empty().append($(data));

        let description = $(".movie-overview-description"); // description div in html
        let descriptionImage = $('.movie-overview-preview'); // preview div in html

        descriptionImage.find("img").attr("src", "./assets/img/films/" + FILMS[this.index].icon);
        description.find(".movie-overview-title").html(FILMS[this.index].title);
        description.find(".movie-overview-age").html("Age: " + FILMS[this.index].age);
        description.find(".movie-overview-duration").html("Duration: " + FILMS[this.index].duration);
        description.find(".movie-overview-genres").html(FILMS[this.index].genres);
        description.find(".movie-overview-summary").html(FILMS[this.index].actors);
        // description.show();

        $('.movie-overview-description-close').click(() => this.offLoadDescription());
        $('.movie-overview-description-play').click(() => this.loadMovie(this.index));
    }


    /**
     * @author Kenneth Mensah
     * This method empties the description and hides the container.
     */
    offLoadDescription() {
        app.forceVisit("movieView", FILMS[this.index].title);
        app.loadController("movieOverview");
    };

    /**
     * @author Kenneth Mensah & Noah Visser
     * This method loads the movie and the description of the movie.
     *
     * @param {number} index the index of the movie
     */
    loadMovie(index) {
        console.log(this.index);
        new VideoPlayerController("./assets/films/" + FILMS[index].link,
            "./assets/img/films/" + FILMS[index].icon,
            FILMS[index].title, FILMS[index].actors, FILMS[index].genres);
    }
}

