class UserCallFlightAttendantController extends Controller {
    /**
     * This constructor loads the call flight attendant notification, and puts it in the notifications table of the database.
     * @author Jerome Tesselaar
     * @extends Controller
     */

    constructor() {
        super("views/userCallFlightAttendant.html");
        this.repo = new AdminRepository();
    }

    /**
     *
     * @param {Object} data loads the notifications that are already in the database so they can be validated.
     */

    setup(data){
        this.viewData = $(data);
        $(".content").empty().append($(data));

        this.repo.getNotification().then(o => (this.validateNotification(o)));
        $('#backToHomeButton').on("click", () => app.loadController(CONTROLLER_HOME));
    }

    /**
     *
     * @param {Object} data are the notification messages that are already in the database, used to validate if the notification
     * is already in the database.
     * @author Jerome Tesselaar
     */
    validateNotification(data) {
        const seatNumber = sessionManager.get("username");
        let message = 0;
        let duplicateValidation = false;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if(seatNumber === data[i].Seat_number && message === data[i].message){
                duplicateValidation = true;
            }
        }
        console.log(duplicateValidation);
        if (!duplicateValidation){
            this.repo.setNotification(message, seatNumber).then(this.validationMessage(seatNumber));
        }

    }

    /**
     *
     * @param {String} seatNumber of the user that is logged in.
     * The console message just gives a small update to the developer, to show that nothing went wrong.
     * @author Jerome Tesselaar
     */

    validationMessage(seatNumber){
        const message =  " wants to speak to the flight attendant"

        console.log(seatNumber + message + " has been added to the database!");
    }
}

