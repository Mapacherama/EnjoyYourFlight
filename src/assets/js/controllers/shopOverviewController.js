/**
 * Controller responsible for all events shop overview page
 * @author Marc Specht
 * @extends Controller
 */
class ShopOverviewController extends Controller {

    constructor() {
        super("views/shopoverview.html");
        this.shopRepository = new ShopRepository();
    }

    setup(data) {
        // Get the view
        this.view = $(data);
        $(".content").empty().append($(data));

        // Requests the product data
        this.shopRepository.loadAllProducts().then(o => this.generateProducts(o));
        const shoppingCartButton = $(".btn-shopping-cart");
        shoppingCartButton.on("click", () => app.loadController(CONTROLLER_SHOPPING_CART));
        this.makeNewShoppingSession();
        shoppingCartButton.attr('data-after', updateCartAmount());
    }

    /**
     * Loads all products into the page
     * @param {Object} data requested product data
     * @author Marc Specht
     */
    generateProducts(data) {
        let productContainer = $('.product-overview--container');
        let template = $('.product-overview--template');
        for (let i = 0; i < data.length; i++) {
            let product = template.clone().removeClass("product-overview--template");
            product.find(".product-image").attr('style', "background-image:url('" + data[i].image + "')");
            product.attr('id', data[i].id);
            product.attr('category', data[i].category);
            product.find(".product-title").html(data[i].title);
            product.find(".product-description").html(data[i].description);
            product.find(".product-price").html(generateFancyPrice(data[i].price));

            productContainer.append(product);
        }
        // Removes the product template after all products are inserted
        template.remove();

        /**
         * @Type {jQuery|HTMLElement} this element loads the String variable, that refers to the category that the product belongs to.
         * Based on the category the products can get filtered out, and after they've been filtered they can get added back to the template.
         * When there is no String added tp the parameter, all the shopping products will be added to the template.
         */

        const allProducts = $('.product-overview');
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].addEventListener("click", () => this.handleAddCartClick(allProducts[i].getAttribute("id")));
        }

        // Filter click events
        $('#shopFilterAll').on("click", () => filterProducts());
        $('#shopFilterFood').on("click", () => filterProducts("food"));
        $('#shopFilterDrink').on("click", () => filterProducts("drink"));
        $('#shopFilterOther').on("click", () => filterProducts("other"));

        let filterProducts = (category) => {
            productContainer.empty();
            let chosenProducts;
            if(category){
                for (let i = 0; i < allProducts.length; i++) {
                    productContainer.hide(0, allProducts[i]);
                }
                chosenProducts = allProducts.filter(`[category="${category}"]`);
                for(let i=0; i < chosenProducts.length; i++){
                    productContainer.show(0, chosenProducts[i]);
                }
            } else{
                chosenProducts = allProducts;
            }
            productContainer.append(chosenProducts);
        }
    }

    /**
     * Handles the click event for .add-cart button
     * @param {number} id product-id
     * @author Marc Specht
     */
    handleAddCartClick(id){
        id = parseInt(id);
        addProductToCart(id);
        const button = $(".btn-shopping-cart");
        button.attr('data-after', updateCartAmount());
        button.toggleClass('btn-shopping-cart-after');
        button.toggleClass('btn-shopping-cart-after--add');
        setTimeout(() => {
            button.toggleClass('btn-shopping-cart-after');
            button.toggleClass('btn-shopping-cart-after--add');
        }, 1000);
        $(".nav-shopping-cart").attr('data-after', updateCartAmount());
    }

    /**
     * Set the shoppingList session to an empty array
     * @author Marc Specht
     */
    makeNewShoppingSession(){
        if(sessionManager.get("shoppingList") === undefined){
            sessionManager.set("shoppingList", []);
        }
    }
}