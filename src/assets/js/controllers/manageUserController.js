/**
 * Controller for manage user page
 * @author Noah Visser
 * @extends Controller
 */
class ManageUserController extends Controller {

    /**
     * Create an instance of the controller.
     * @public
     */
    constructor() {
        // hideNavbar();
        super("views/manageUsers.html");
    }

    /**
     * Calls all the necessary methods to initialize the page.
     * @author Noah Visser
     * @param data {HTMLElement} The html data to be loaded in the window.
     * @private
     */
    setup(data){
        this.viewData = $(data);
        this.repo = new AdminRepository();
        this.users = this.repo.getUsers().then((data)=> {
            this.userData = data;
            this.htmlBuilder()});
    }

    /**
     * Fills in the html with data from different sources.
     * @private
     * @author Noah Visser
     */
    htmlBuilder(){
        this.viewData.find(".manage-dialogue-box").find("i").on("click", () => $(".manage-edit-overlay").hide());

        let list = this.viewData.find(".manage-user-list");
        let template = list.find(".template");
        let separator = list.find(".manage-block-separator");

        for(let i = 0; this.userData.length > i; i++){
            let block = template
                .clone()
                .removeClass("template");

            block.find("h1").html(this.userData[i].seat_number.toLocaleUpperCase());

            if(this.userData[i].is_blocked === 0) {
                block.find(".editButton").on("click", () => this.showOverlay(this.userData[i].seat_number));
                block.find(".blockButton").on("click", () => {
                    this.repo.blockUser(this.userData[i].seat_number, true).then(() => app.loadController( "manageUser"));
                });
            }
            else {
                block.find(".editButton").replaceWith("<p class='manage-blocked-text'>Blocked</p>");
                let blockButton = block.find(".blockButton");
                blockButton.on("click", () => {
                    this.repo.blockUser(this.userData[i].seat_number, false).then(() => app.loadController( "manageUser"));
                });
                blockButton.removeClass("btn-primary");
                blockButton.html("Unblock");
            }

            list.append(block);
        }

        template.remove();

        this.viewData.find(".manage-edit-overlay").hide();

        this.searchBox = this.viewData.find("#searchUsers");
        this.searchBox.on("input", () => this.filterUsers());

        $(".content").empty().append(this.viewData);

        $(".sidebar").addClass("manage-fixed");
        console.log(this.userData);
    }

    /**
     * Checks whether the passwords in the overlay match.
     * @author Noah Visser
     * @returns {boolean} Whether the passwords match.
     * @private
     */
    doesPasswordMatch(){
        let overlay = $(".manage-edit-overlay");
        return overlay.find("#pass").val() === overlay.find("#confirmPass").val();
    }

    /**
     * Shows the edit overlay.
     * @author Noah Visser
     * @param id {number} The seat number of the user.
     * @public
     */
    showOverlay(id){
        let overlay = $(".manage-edit-overlay");
        overlay.find("#manage-seat-change").submit((event)=> {
            event.preventDefault();
            this.repo.changeSeat(id, overlay.find("#seatNumber").val()).then(() => app.loadController( "manageUser"));
        });

        overlay.find("#seatNumber").val(id);

        overlay.find("#manage-password-change").submit((event)=> {
            event.preventDefault();
            const password = overlay.find("#pass").val();
            if(this.doesPasswordMatch()) this.repo.changePassword(id, password).then(() => overlay.hide());
            else {
                overlay.find("#confirmPass").addClass("is-invalid");
                event.preventDefault()
            }
        });

        overlay.find("#deleteButton").on("click", ()=> {
            this.repo.deleteUser(id).then(() => app.loadController("manageUser"));
        });

        overlay.show();
        console.log(id);
    }

    /**
     * Filters the users and only shows those who match.
     * @author Noah Visser
     * @public
     */
    filterUsers(){
        let list = document.getElementsByClassName("manage-user-list")[0];
        console.log("dit is de manage-user-list " + list);
        let users = list.getElementsByClassName("manage-block");
        let string = this.searchBox.val().toUpperCase();

        for(let i = 0; i < users.length; i++){
            let seat = users[i].getElementsByClassName("manage-seat-text-wrapper")[0].getElementsByTagName("h1")[0];
            if(!seat.innerHTML.includes(string)) {
                console.log($(users[i]).hide());
                console.log(i + " yes");
            }
            else {
                console.log($(users[i]).show());
                console.log(i + " no");
            }
        }
    }
}
