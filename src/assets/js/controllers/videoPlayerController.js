/**
 * Controller for the video player page
 * @extends Controller
 */

class VideoPlayerController extends Controller {
    /**
     *
     * @author Jerome Tesselaar, group 7 PAD.
     *
     */
    constructor(filmLocation, poster, title, actors, genres) {
        super("views/videoplayer.html");
        this.filmLocation = filmLocation;
        this.poster = poster;
        this.title = title;
        this.actors = actors;
        this.genres = genres;
        app.setBeforeClose(() => app.forceVisit("movieView", this.title));
    }

    setup(data) {
        hideNavbar();
        $(".content").empty().append($(data));

        $('#titel').html("Title: " + this.title);
        $('#cast').html("Cast: " + this.actors);
        $('#genre').html("Genre: " + this.genres);

        /**
         * {Object} Videoplayer is a variable that refers to the videoplayer library, it also gives the settings to the video player.
         */

        let videoPlayer = videojs('video-js', {
            fill: true,
            playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
            loop: true,
            poster: this.poster,
            controls: true,
            responsive: true,
            textTrackSettings: false
        });

        /**
         * .src gives the correct movie path trough to the video player.
         */

        //
        videoPlayer.src({
            src: this.filmLocation
        });

        /**
         * This function is to make sure that the function to double click didn't work, I did that for design reasons, because
         * the show video information on pause doesn't work on fullscreen.
         */
        videoPlayer.ready(function () {
            videoPlayer.tech_.off('dbclick');
        });

        /**
         * When the backToOverview arrow has been clicked, the instance of the video player gets deleted so that there is
         * no old instance of the video player when the user goes back and forth between videos (this is being done to get rid
         * of any video loading bugs). Afterwards the user will be send back to the movie overview page.
         */

        //Als er op de pijlafbeelding wordt geklikt wordt de pagina herladen.
        $('#backToOverviewArrow').click(function () {
            videoPlayer.dispose();
            app.loadController("movieOverview")
        });

        /**
         * When the video is being played, these two lines of code will make sure that the movie information will go away,
         * and vice versa when the video is being paused.
         */

        videoPlayer.on("play", this.hideVideoInformation.bind());
        videoPlayer.on("pause", this.showVideoInformation.bind());
    }

    error() {
        $(".content").html("Failed to load content!");
    }

    /**
     * Will make sure that the movie information goes away when the user presses play.
     * @author Jerome Tesselaar
     */

    hideVideoInformation() {
        $("#video-informatie").hide(1000);
        $("#backToOverviewArrow").hide(1000);
    }

    /**
     * This function will show the movie information when the video player is being paused by the user.
     * @author Jerome Tesselaar
     */

    showVideoInformation() {
        $("#video-informatie").show();
        $("#backToOverviewArrow").show();
    }
}




