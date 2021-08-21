/**
 * Responsible for handling the actions happening on sidebar view
 *
 * @author Lennard Fonteijn, Pim Meijer, Marc Specht
 * @extends Controller
 */
class NavbarController extends Controller {
    constructor() {
        super("views/navbar.html");
    }

    //Called when the navbar.html has been loaded
    setup(htmlData) {
        //Load the sidebar-content into memory
        const sidebarView = $(htmlData);

        adminRepo.isAdmin().then((data) => {
            if(!data) {
                console.log(data);
                $('#adminNav').empty();
            }
            else $('#adminNav').css("visibility", "visible");
        });

        //Find all anchors and register the click-event
        sidebarView.find("a").on("click", this.handleClickMenuItem);

        // Logic where to show the back button
        const currentView = getCurrentController();
        const backButton = sidebarView.find('#navbarBackButton');
        switch (currentView) {
            // Put every view in here which should't have the back button
            case "home":
                backButton.remove();
                break;
        }

        //Empty the sidebar-div and add the resulting view to the page
        const sidebar = $(".sidebar");
        sidebar.empty().append(sidebarView);

        $(".nav-shopping-cart").attr('data-after', updateCartAmount());
    }

    /**
     * Handles click event of a menu item.
     * @returns {boolean} prevent reloading the page
     * @author Lennard Fonteijn, Pim Meijer, Marc Specht
     */
    handleClickMenuItem() {
        //Get the data-controller from the clicked element (this)
        let controller = $(this).attr("data-controller");

        // Back button logic
        if(controller === "back"){
            switch(location.hash.slice(1)){
                case "movieOverview":
                    controller = "home";
                    break;
                case "shoppingCart":
                case "shopThankYouPage":
                    controller = "shopOverview";
                    // backButton.show();
                    break;
                default:
                    controller = "home";
                    break;
            }
        }

        // Check if cart is empty then go to shop overview page
        let shoppingList = sessionManager.get("shoppingList");
        if(controller === "shoppingCart"){
            if(shoppingList === undefined || shoppingList.length === 0){
                controller = "shopOverview";
            }
        }

        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }
}
