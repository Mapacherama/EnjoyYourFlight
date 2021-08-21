/**
 * Controller for the admin notification page
 * @extends Controller
 */
class AdminNotificationController extends Controller {
    /**
     * This constructor loads the notifications, and shows them to the Administrator on the notification page.
     * @author Jerome Tesselaar
     */

    constructor() {
        super("views/adminNotifications.html");
        this.repo = new AdminRepository();
    }

    /**
     * Generate all user notifications to the admin
     * @param {Object} data notifications with 0 and 1 for the type of messages
     * 1 = password forgotten, 0 is that the user wants to speak to the stewardess.
     */
    setup(data){
        this.viewData = $(data);
        $(".content").empty().append($(data));
        this.repo.getNotification().then(o => this.getNotification(o));
    }

    /**
     *
     * @param {Object} data gets the notifications from the database request.
     */

    getNotification(data){
        const callStewardMessage = " wants to speak to the flight attendant";
        const passwordForgottenMessage = " wants to have his password changed";

        let list = $(".notification-list");

        console.log(list);

        let template = list.find(".template");

        console.log(template);

        for (let i = 0; i < data.length ; i++) {
            const seatNumber = data[i].Seat_number;
            const message = data[i].message;

            console.log(seatNumber + " " + message);

            let block = template
                .clone()
                .removeClass("template");

            block.find("h4").html(data[i].Seat_number);
            block.find('#notification-read').on('click', () => this.deleteNotification(message, seatNumber));



            if (data[i].message === 1){
                block.find("h5").html(data[i].Seat_number + passwordForgottenMessage);
            } else {
                block.find("h5").html(data[i].Seat_number + callStewardMessage);
            }

            list.append(block);

        }

        template.remove();
    }

    /**
     *
     * @param {String} message is a number value for the message it contains.
     * @param {String} seatNumber is the seat number that the passenger uses as his login name.
     * The read notification in the admin repository contains a SQL query that removes the notification
     * that has the message number and SeatNumber given in the parameter.
     */
    deleteNotification(message, seatNumber){
        this.repo.deleteNotification(message, seatNumber).then(() => app.loadController("notifications"));
    }

}

