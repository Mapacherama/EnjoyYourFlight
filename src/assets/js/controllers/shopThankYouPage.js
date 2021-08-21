/**
 * This controller handles all event on the shop thankyou page
 * @author Marc Specht
 * @extends Controller
 */
class ShopThankYouPage extends Controller {

    constructor() {
        super("views/shopthankyoupage.html");
        this.shopRepository = new ShopRepository();
    }

    /**
     * Setup the page
     * @param data html template
     * @author Marc Specht
     */
    setup(data) {
        // Get the view
        this.view = $(data);
        $(".content").empty().append($(data));

        const seatNumber = sessionManager.get("username");
        this.shopRepository.getMyOrder(seatNumber).then(data => this.generateOrder(data));
        $('#backToStoreButton').on("click", () => app.loadController(CONTROLLER_SHOP_OVERVIEW));
    }

    /**
     * Generate the overview of the order
     * @param data Order product and quantity data
     * @author Marc Specht
     */
    generateOrder(data){
        $('#orderNumber').html("# " + this.generateOrderNumber(data[0].order_number));

        let container = $('.order-summary--thankyou > #orderNumber');
        let template = $('.template');
        let total = 0;

        // Loop through all products from order
        for (let i = 0; i < data.length; i++) {
            let product = template.clone().removeClass('template');
            const quantity = data[i].quantity;
            const title = data[i].title;
            const price = data[i].price;
            product.find('#product-quantity').html(quantity + "x");
            product.find('#product-title').html(title);
            product.find('#product-price').html(generatePrice(quantity * price));
            total += quantity * price;

            product.insertAfter(container);
        }

        $('#total-price').html(generatePrice(total));
        template.remove();
    }

    /**
     * Format the order number.
     * @param number order number
     * @returns {string|*} formatted order number string. Example: '#00006'.
     * @author Marc Specht
     */
    generateOrderNumber(number){
        let newString = number.toString();
        if(newString.length < 5){
            while(newString.length < 5){
                newString = 0 + newString;
            }
            return newString;
        }
        else{
            return number;
        }
    }
}