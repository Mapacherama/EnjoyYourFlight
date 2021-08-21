/**
 * RegistrationController is responsible for all registration related actions
 * @author Tico Vermeer
 * @extends Controller
 */

class RegistrationController extends Controller {
    constructor() {
        super("views/registration.html");
        this.userRepository = new UserRepository();
    }

    // Called when registration page is loaded
    setup(htmlData) {

        // Adds content to memory
        this.registrationView = $(htmlData);

        $(".content").empty().append(this.registrationView);

        this.registrationView.find('.register-form').on('submit', (e) => this.handleRegistration(e));
        this.registrationView.find('#loginButton').on('click', (e) => this.handleLoginButton(e));

        this.runWhenLoaded();
    }

    runWhenLoaded(){
        $(()=>{
            showPassword();
            $('.selectpicker').selectpicker();
        });
    }

    handleLoginButton(e){
        e.preventDefault();
        app.loadController(CONTROLLER_LOGIN);
    }

    async handleRegistration(event){
        event.preventDefault();

        let seatNumber = this.registrationView.find("[name='username']").val();
        let password = this.registrationView.find("#inputPassword").val();
        let passwordCheck = this.registrationView.find("#inputPasswordConfirm").val();

        // Check if fields are not empty
        if(seatNumber === "" || password === "" || passwordCheck === ""){
            this.registrationView.find(".error").empty();
            this.registrationView
                .find(".error")
                .html("Please fill in all fields");
        }
        // If passwords match
        else if(password === passwordCheck){
            try{
                this.registrationView.find(".error").empty();
                // Await keyword 'stops' code until data is returned - can only be used in async function
                await this.userRepository.register(seatNumber, password).then( (data) => {
                    console.log(data);
                    this.userRepository.login(seatNumber, password).then((o) => {
                        console.log("Login!");
                        sessionManager.set("username", o.seat_number);
                        console.log(sessionManager.get("username"));

                        app.loadController(CONTROLLER_HOME);
                    });
                });

            } catch(e) {
                // If unauthorized error show error to user
                if(e.code === 401) {
                    this.registrationView
                        .find(".error")
                        .html(e.reason);
                // 400 duplicate entry
                } else if(e.code === 400){
                    this.registrationView
                        .find(".error")
                        .html("Seat number already exists");
                }else {
                    console.log(e);
                }
            }
        } else{
            this.registrationView.find(".error")
                .html("Passwords do not match");
        }

    }
}


