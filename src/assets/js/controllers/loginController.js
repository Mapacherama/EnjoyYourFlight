/**
 * Controller responsible for all events in view and setting data
 *
 * @author Pim Meijer, Marc Specht
 * @extends Controller
 */
class LoginController extends Controller {

    constructor() {
        super("views/login.html");
        this.userRepository = new UserRepository();
    }

    //Called when the login.html has been loaded
    setup(data) {
        //Load the login-content into memory
        this.loginView = $(data);

        this.loginView.find(".login-form").on("submit", (e) => this.handleLogin(e));
        this.loginView.find("#registerButton").on("click", (e) => this.handleRegisterButton(e));
        this.loginView.find("#passwordResetButton").on("click", (e) => this.handlePasswordResetButton(e));
        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.loginView);

        this.runWhenLoaded();
    }

    /**
     * Redirects to registration view
     * @param {Object} e the button
     */
    handleRegisterButton(e){
        e.preventDefault();
        app.loadController(CONTROLLER_REGISTRATION);
    }

    /**
     * Redirect to passwordReset view.
     * @param {Object} e the button.
     */
    handlePasswordResetButton(e){
        e.preventDefault();
        app.loadController(CONTROLLER_PASSWORD_RESET);
    }

    /**
     * Executes when view is loaded
     */
    runWhenLoaded(){
        $(()=>{
            showPassword();
            $('.selectpicker').selectpicker();
        });
    }

    /**
     * Async function that does a login request via repository
     * @param {Object} event Login button
     * @author Marc Specht
     */
    async handleLogin(event) {
        //prevent actual submit and page refresh
        event.preventDefault();

        //Find the username and password
        const seatNumber = this.loginView.find("[name='username']").val();
        const password = this.loginView.find("[name='password']").val();

        try{
            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await this.userRepository.login(seatNumber, password);
            sessionManager.set("username", user.seat_number);
            app.loadController(CONTROLLER_HOME);

        } catch(e) {
            //if unauthorized error show error to user
            if(e.code === 401) {
                this.loginView
                    .find(".error")
                    .html(e.reason);
            } else {
                alert(e);
            }
        }
    }
}