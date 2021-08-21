// TODO: Probably turn this into a JSON file.
const APPLETS = [
    [
        {
            icon: "./assets/img/apps/films.svg",
            title: "Films",
            controller: "movieOverview"
        },
        // {
        //     icon: "./assets/img/apps/games.svg",
        //     title: "Games",
        //     controller: "game"
        // },
        // {
        //     icon: "./assets/img/apps/music.svg",
        //     title: "Music",
        //     controller: "music"
        // },
        // {
        //     icon: "./assets/img/apps/ebooks.svg",
        //     title: "E-Books",
        //     controller: "ebook"
        // },
        // {
        //     icon: "./assets/img/apps/podcasts.svg",
        //     title: "Podcasts",
        //     controller: "podcast"
        // },
        {
            icon: "./assets/img/apps/shop.svg",
            title: "Store",
            controller: "shopOverview"
        },
        {
            icon: "./assets/img/apps/flightInformation.svg",
            title: "Flight information",
            controller: "flightInformation"
        },
        {
            icon: "./assets/img/apps/internet.svg",
            title: "Internet",
            controller: "internet"
        }
    ],
    [
        // {
        //     icon: "./assets/img/apps/settings.svg",
        //     title: "Settings",
        //     controller: "settings"
        // },
        // {
        //     icon: "./assets/img/apps/search.svg",
        //     title: "Find passengers",
        //     controller: "search"
        // },
        // {
        //     icon: "./assets/img/apps/chat.svg",
        //     title: "Chat",
        //     controller: "chat"
        // },
        {
            icon: "./assets/img/apps/callStewardess.svg",
            title: "Call flight attendant",
            controller: "callFlightAttendant"
        },
        {
            icon: "./assets/img/apps/signOut.svg",
            title: "Sign out",
            controller: "logout"
        }
    ]
];

/**
 * Controller for the home page
 * @extends Controller
 * @author Noah Visser
 */
class HomeController extends Controller{

    /**
     * Create an instance of the controller.
     */
    constructor() {
        super("views/home.html");
    }

    /**
     * @protected
     * @param data {HTMLElement} The content to be loaded on the page.
     * @author Noah Visser
     */
    setup(data) {
        this.homeView = $(data);
        this.appList = this.homeView.find(".home-apps");
        for(let i = 0; i < APPLETS.length; i++) {
            for (let j = 0; j < APPLETS[i].length; j++) {
                let apps = APPLETS[i][j];
                console.log(apps);
                let applet = this.homeView.find(".template")
                    .clone()
                    .removeClass("template");
                applet.find(".home-applet-icon").attr("src", apps.icon);
                applet.find(".home-applet-name").html(apps.title);
                applet.find(".home-applet-link").attr("data-controller", apps.controller);
                applet.find(".home-applet-link").on("click", this.handleClickMenuItem);
                this.appList.append(applet);
            }
            if(i !== APPLETS.length - 1) this.appList.append("<div class='w-100' style='height: 1px; background: #E9E9E9; margin-bottom: 10px;'></div>");
        }

        this.appList.find(".template").remove();
        $(".content").empty().append(this.homeView);
    }

    /**
     * Handles the loading of controllers after clicking on an applet.
     * @private
     * @returns {boolean} Returns false by default.
     * @author Noah Visser
     */
    handleClickMenuItem() {
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }

}