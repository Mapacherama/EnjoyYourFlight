/**
 * Resposible for all password reset related actions.
 * @author Tico Vermeer
 * @extends Controller
 */

class PasswordResetController extends Controller {

    constructor() {
        super("views/passwordReset.html");
        this.userRepository = new UserRepository();
    }

    // Called when passwordReset has been loaded
    setup(htmlData) {
        // Adds content to memory
        this.passwordResetView = $(htmlData);

        $(".content").empty().append(this.passwordResetView);
        this.passwordResetView.find('#proceedButton').on('click', (e) => this.handleProceedButton(e));
        this.passwordResetView.find('#cancelButton').on('click', (e) => this.handleCancelButton(e));
    }

    /**
     * Redirect to the confirmation page if the seat number input is in the database and if it isn't empty.
     * @param {Object} e Event proceed button
     */
    async handleProceedButton(e) {
        // Prevent actual submit and page refresh
        e.preventDefault();

        // Find the seat number
        let seatNumber = this.passwordResetView.find("[name='username']").val();

        // Checks if the seat number isn't empty and shows error if it is empty
        if (seatNumber === "") {
            this.passwordResetView.find(".error").empty()
            this.passwordResetView
                .find(".error")
                .html("Please fill in your seat number");
        } else try {
            // Waits for data to be returned
            await this.userRepository.passwordReset(seatNumber);
            app.loadController(CONTROLLER_PASSWORD_RESET_CONFIRMATION);
        } catch (e) {
            // If unauthorized error show to user
            if (e.code === 401) {
                this.passwordResetView.find(".error").html(e.reason)
            } else {
                console.log(e);
            }
        }
    }

    /**
     * Redirects to login view
     * @param {Object} e the button
     */
    handleCancelButton(e) {
        e.preventDefault();
        app.loadController(CONTROLLER_LOGIN)
    }
}


