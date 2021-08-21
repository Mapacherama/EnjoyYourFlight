/**
 * This controllers handles all events on the shopping cart page
 * @extends Controller
 * @author Marc Specht, Jerome Tesselaar, Noah Visser & Kenneth Mensah
 */
class ShoppingCartController extends Controller {

    constructor() {
        super("views/shoppingcart.html");
        this.shopRepository = new ShopRepository();
    }

    /**
     * Setup the page data
     * @param {Object} data html template
     * @author Marc Specht
     */
    setup(data) {
        // Get the view
        this.view = $(data);
        $('.content').empty().append($(data));

        // Get the current shop session
        let shoppingList = sessionManager.get("shoppingList");

        if(shoppingList.length === 0){
            let noProductInCartDiv = `<div class="container"><p>Shopping cart is empty</p><button class="backToStoreButton btn btn-block btn-primary">Back to shop</button> </div>`;
            $('.shopping-cart-table').html(noProductInCartDiv);
        } else{
            this.generateTotalProducts();
            this.shopRepository.createCart(shoppingList).then(number => this.generateCart(number));
        }
        $('.backToStoreButton').on("click",() => app.loadController(CONTROLLER_SHOP_OVERVIEW));
        $('#checkoutButton').on("click", () => this.shopRepository.getLastOrder().then(o => this.createOrder(o)));
    }

    /**
     * Create order and send to database
     * @param {number} orderNumber
     * @returns {Promise<void>} order
     * @author Marc Specht
     */
    async createOrder(orderNumber){
        try{
            const order = sessionManager.get("shoppingList");
            const seatNumber = sessionManager.get("username");
            await this.shopRepository.createOrder(order, orderNumber, seatNumber).then(o => console.log(o));
                sessionManager.set("shoppingList", []);
                app.loadController(CONTROLLER_SHOP_THANK_YOU);
        } catch (e){
            alert(e);
        }
    }

    /**
     * Generate all chosen products from shopping cart from session
     * @param {Object} data products
     * @author Marc Specht
     */
    generateCart(data) {
        const currentSession = sessionManager.get("shoppingList");
        const tableBody = $(".shopping-cart-table");

        // Get the template div form the view
        const template = this.view.find(".shopping-cart-template");

        // Declare totalPrice to count each product price
        let totalPrice = parseInt(0);

        // Loop through shoppingList session array to find the chosen products.
        for (let i = 0; i < data.length; i++) {
            let product = template.clone().removeClass("shopping-cart-template");

            // Get the correct object
            let object = currentSession.find(x => x.id === data[i].id);

            // Replace the quantity input value
            const inputQuantity = product.find(".product-quantity");
            inputQuantity.val(object.quantity);

            product.find(".product-image--cart").attr('src', data[i].image);
            product.find(".product-title").html(data[i].title);
            product.find(".product-description").html(data[i].description);
            product.find(".product-remove").on("click", () => {
                totalPrice -= data[i].price * object.quantity;
                this.generateTotalSummary(this.generatePrice(totalPrice));
                product.remove();
                let session = sessionManager.get("shoppingList");
                let index = session.indexOf(object);
                session.splice(index, 1);
                sessionManager.set("shoppingList", session);
                if(session.length === 0){
                    $('.shopping-cart-table').html('<p>Shopping cart is empty</p><button id="backToTheStoreButton" class="btn btn-block btn-primary">Back to shop</button>');
                }
                $('#backToTheStoreButton').on("click",() => app.loadController(CONTROLLER_SHOP_OVERVIEW));
                this.generateTotalProducts();
                $('.nav-shopping-cart').attr('data-after', updateCartAmount());
            });

            let productPrice = product.find(".product-price");
            productPrice.html(generateFancyPrice(data[i].price * object.quantity));

            // Handle .plus-btn click event
            product.find(".plus-btn").on("click", () => {
                if (object.quantity < 10) {
                    addProductToCart(data[i].id);
                    productPrice.html(generateFancyPrice(data[i].price * object.quantity));
                    $('#totalItems').html("Items (" + updateCartAmount() + ")");
                    $(".nav-shopping-cart").attr('data-after', updateCartAmount());
                    totalPrice += parseInt(data[i].price);
                    this.generateTotalSummary(this.generatePrice(totalPrice));
                }
            });

            // Handle .minus-btn click event
            product.find(".minus-btn").on("click", () => {
                if (object.quantity > 1) {
                    decrementProductSession(data[i].id);
                    productPrice.html(generateFancyPrice(data[i].price * object.quantity));
                    $('#totalItems').html("Items (" + updateCartAmount() + ")");
                    $(".nav-shopping-cart").attr('data-after', updateCartAmount());
                    totalPrice -= parseInt(data[i].price);
                    this.generateTotalSummary(this.generatePrice(totalPrice));
                }
            });

            tableBody.append(product);

            totalPrice += data[i].price * object.quantity;
            this.generateTotalSummary(this.generatePrice(totalPrice));
        }
        $(".shopping-cart-template").remove();


        $('.plus-btn').on('click', function (e) {
            // e.preventDefault();
            let button = $(this);
            let input = button.closest('div').find('input');
            let value = parseInt(input.val());

            if (value < 10) {
                value = value + 1;
            } else {
                value = 10;
            }
            input.val(value);
        });

        $('.minus-btn').on('click', function (e) {
            // e.preventDefault();
            let $this = $(this);

            let $input = $this.closest('div').find('input');
            let value = parseInt($input.val());
            if (value > 1) {
                value = value - 1;
            } else {
                value = 1;
            }

            $input.val(value);
        });

    }

    /**
     * Generate the price based on cents and quantity
     * @param {number} cents amount of cents (€)
     * @param {number} quantity amount of products per type
     * @returns {string} price in euro's with 2 decimals
     * @author Marc Specht
     */
    generatePrice(cents, quantity) {
        let price;
        if(quantity === undefined || quantity === null){
            price = cents;
        } else if (quantity === 0){
            price = 0;
        } else{
            price = cents * quantity;
        }
        return "&euro; " + (price / 100).toFixed(2);
    }

    /**
     * Set the total price to the html #totalPrice div
     * @param {number} total
     * @author Marc Specht
     */
    generateTotalSummary(total){
        $('#totalPrice').html(total);
    }

    /**
     * Set the total product count into #totalItems div
     * @author Marc Specht
     */
    generateTotalProducts() {
        $("#totalItems").html("Items (" + updateCartAmount() + ")");
    }
}