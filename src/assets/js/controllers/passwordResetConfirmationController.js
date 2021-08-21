/**
 * all actions on the confirmation page.
 * @author Tico Vermeer
 * @extends Controller
 */
class PasswordResetConfirmationController extends Controller {
    constructor() {
        super("views/passwordResetConfirmation.html");
        this.userRepository = new UserRepository();
    }

    // Called whem confirmation page is loaded
    setup(htmlData) {
        // Adds content to memory
        this.passwordResetConfirmationView = $(htmlData);

        $(".content").empty().append(this.passwordResetConfirmationView);

        this.passwordResetConfirmationView.find('#backToLoginButton').on('click', (e) => this.handleBackToLoginButton(e));
    }

    /**
     * Redirect to login page.
     * @param {Object} e
     */

    handleBackToLoginButton(e){
        e.preventDefault();
        app.loadController(CONTROLLER_LOGIN)
    }
}


