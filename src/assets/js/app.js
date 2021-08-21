/**
 * Entry point front end application - there is also an app.js for the backend (server folder)!
 *
 * Available: `sessionManager` or `networkManager` or `app.loadController(..)`
 *
 * You only want one instance of this class, therefor always use `app`.
 *
 * @author Lennard Fonteijn & Pim Meijer, Marc Specht
 */
const CONTROLLER_SIDEBAR = "sidebar";
const CONTROLLER_LOGIN = "login";
const CONTROLLER_LOGOUT = "logout";
const CONTROLLER_HOME = "home";
const CONTROLLER_VIDEO_PLAYER = "videoPlayer";
const CONTROLLER_MOVIEOVERVIEW = "movieOverview";
const CONTROLLER_REGISTRATION = "registration";
const CONTROLLER_INTERNET = "internet";
const CONTROLLER_SHOPPING_CART = "shoppingCart";
const CONTROLLER_MANAGE_USER = "manageUser";
const CONTROLLER_MANAGE_PRODUCT = "manageProduct";
const CONTROLLER_SHOP_OVERVIEW = "shopOverview";
const CONTROLLER_SHOP_THANK_YOU = "shopThankYouPage";
const CONTROLLER_UPLOAD = "uploadFile";
const CONTROLLER_ADMIN_ORDERS = "orders";
const CONTROLLER_MANAGE_DATA = "manageData";
const CONTROLLER_PASSWORD_RESET= "passwordReset";
const CONTROLLER_PASSWORD_RESET_CONFIRMATION= "passwordResetConfirmation";
const CONTORLLER_FLIGHT_INFORMATION = "flightInformation";
const CONTROLLER_ADMIN_NOTIFICATIONS = "notifications";
const CONTROLLER_CALL_FLIGHT_ATTENDANT = "callFlightAttendant";

const sessionManager = new SessionManager();
const networkManager = new NetworkManager();
const statisticRepo = new statisticsRepository();

const adminRepo = new AdminRepository();

let controllerOpenedTime = new Date();

class App {

    init() {
        // Initialize the beforeClose variable.
        this.beforeClose = undefined;

        // Execute the beforeClose function before the window is closed.
        window.onbeforeunload = () => {
            try {
                this.beforeClose();
            } catch (e) {
                this.forceVisit(this.getCurrentController());
            }
            return false;
        };

        // Load the sidebar when logged in
        this.loadController(CONTROLLER_SIDEBAR);

        //Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        this.loadControllerFromUrl(CONTROLLER_HOME);
    }
    /**
     * Loads a controller
     * @param name - name of controller - see constants
     * @param data - {controllerData: data to pass from on controller to another, pageData: data useful for analytics}
     * @returns {boolean} - successful controller change
     */
    loadController(name, data) {
        // Execute the beforeClose function because a controller is being closed.
        try {
            this.beforeClose();
        }catch(e){
            // Do nothing
        }

        // Make sure that the beforeClose from the previous controller is wiped.
        this.beforeClose = undefined;

        if (!data) data = {};

        // Hide/Show the sidebar
        const navbar = $('.sidebar');

        navbar.removeClass("manage-fixed");

        this.isLoggedIn(() => navbar.show(), () => navbar.hide());

        switch (name) {
            case CONTROLLER_MANAGE_USER:
                this.setCurrentController(name, data.pageData);
                new ManageUserController();
                new NavbarController();
                break;

            case CONTROLLER_MANAGE_PRODUCT:
                this.setCurrentController(name, data.pageData);
                new ManageProductController();
                new NavbarController();
                break;

            case CONTROLLER_MANAGE_DATA:
                this.setCurrentController(name, data.pageData);
                new ManageDataController();
                new NavbarController();
                break;

            case CONTROLLER_INTERNET:
                grantInternetAccess();
                break;

            case CONTROLLER_SIDEBAR:
                new NavbarController();
                break;

            case CONTROLLER_LOGIN:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new HomeController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_PASSWORD_RESET:
                this.setCurrentController(name, data.pageData);
                new PasswordResetController();
                new NavbarController();
                break;

            case CONTROLLER_PASSWORD_RESET_CONFIRMATION:
                this.setCurrentController(name, data.pageData);
                new PasswordResetConfirmationController();
                new NavbarController();
                break;

            case CONTROLLER_LOGOUT:
                this.setCurrentController(name, data.pageData);
                this.handleLogout();
                break;

            case CONTROLLER_HOME:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new HomeController(), () => new LoginController()) ;
                new NavbarController();
                break;

            case CONTROLLER_REGISTRATION:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new HomeController(), () => new RegistrationController());
                new NavbarController();
                break;

            case CONTROLLER_SHOPPING_CART:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new ShoppingCartController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_SHOP_OVERVIEW:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new ShopOverviewController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_SHOP_THANK_YOU:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new ShopThankYouPage(), () => new LoginController());
                new NavbarController();
                break;

            case CONTORLLER_FLIGHT_INFORMATION:
                this.setCurrentController(name, data.pageData);
                this.isLoggedIn(() => new FlightInformtionController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_VIDEO_PLAYER:
                this.setCurrentController(name, data.pageData);
                new VideoPlayerController();
                new NavbarController();
                break;

            case CONTROLLER_MOVIEOVERVIEW:
                this.setCurrentController(name, data.pageData);
                new FilmOverzichtController();
                new NavbarController();
                break;

            case CONTROLLER_UPLOAD:
                this.setCurrentController(name);
                this.isLoggedIn(() => new UploadController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_ADMIN_ORDERS:
                this.setCurrentController(name);
                this.isLoggedIn(() => new AdminOrdersController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_ADMIN_NOTIFICATIONS:
                this.setCurrentController(name);
                this.isLoggedIn(() => new AdminNotificationController(), () => new LoginController());
                new NavbarController();
                break;

            case CONTROLLER_CALL_FLIGHT_ATTENDANT:
                this.setCurrentController(name);
                this.isLoggedIn(() => new UserCallFlightAttendantController(), () => new LoginController());
                new NavbarController();
                break;

            default:
                return false;
        }

        return true;
    }

    /**
     * Alternative way of loading controller by url
     * @param fallbackController
     */
    loadControllerFromUrl(fallbackController) {
        const currentController = this.getCurrentController();

        if (currentController) {
            if (!this.loadController(currentController)) {
                this.loadController(fallbackController);
            }
        } else {
            this.loadController(fallbackController);
        }
    }

    getCurrentController() {
        return location.hash.slice(1);
    }

    setCurrentController(name, pageData) {
        if(this.getCurrentController() !== name) this.forceVisit(this.getCurrentController(), pageData);
        location.hash = name;
    }

    /**
     * @author Noah Visser
     *
     * Forcefully registers a visit in the database.
     * @param location The view that's being visited.
     * @param pageData The page data to go with in the database.
     */
    forceVisit(location, pageData) {
        let now = new Date();
        statisticRepo.visit(location, Math.abs(now - controllerOpenedTime), pageData);
        controllerOpenedTime = now;
        pageData = "";
    }

    /**
     * Convenience functions to handle logged-in states
     * @param whenYes - function to execute when user is logged in
     * @param whenNo - function to execute when user is logged in
     */
    isLoggedIn(whenYes, whenNo) {
        if (sessionManager.get("username")) {
            whenYes();
        } else {
            whenNo();
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     * @author Marc Specht
     */
    handleLogout() {
        sessionManager.remove("username");
        sessionManager.remove("shoppingList");
        //go to login screen
        this.loadController(CONTROLLER_LOGIN);
    }

    /**
     * @author Noah Visser
     *
     * Binds a function to a variable which will be called when the current view is unloaded.
     * @param func The function to bind.
     */
    setBeforeClose(func){
        this.beforeClose = func;
    }
}

const app = new App();

//When the DOM is ready, kick off our application.
$(function () {
    app.init();
});
