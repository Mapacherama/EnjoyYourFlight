/**
 * Repository responsible for all user data from server - CRUD
 * Make sure all functions are using the async keyword when interacting with network!
 *
 * @author Marc Specht
 */
class ShopRepository {

    constructor() {
        this.route = "/shop"
    }

    /**
     * Requests the product based on the cart session
     * @param productList array of all chosen products
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async createCart(productList) {
        return await networkManager
            .doRequest(this.route + "/productinformation", productList);
    }

    /**
     * Load all product into the product overview page
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async loadAllProducts(){
        return await networkManager
            .doRequest(this.route + "/allproducts", {});
    }

    /**
     * Get the last order id to make a unique one
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async getLastOrder(){
        return await networkManager
            .doRequest(this.route + "/getlastorder", {});
    }

    /**
     * Request to set a new order
     * @param order Object with order data
     * @param orderNumber order number
     * @param username seat number
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async createOrder(order, orderNumber, username){
        return await networkManager
            .doRequest(this.route + "/createorder", {order: order, orderNumber: orderNumber, seatNumber: username});
    }

    /**
     * Request to retrieve an order from the current user
     * @param seatNumber seat number
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async getMyOrder(seatNumber){
        return await networkManager
            .doRequest(this.route + "/getmyorder", {seatNumber: seatNumber});
    }

    /**
     * Fetches all the product categories from the database.
     * @returns {Promise<void>}
     * @author Noah Visser
     * @deprecated
     */
    async getCategories(){
        return await networkManager
            .doRequest(this.route + "/categories", {});
    }
}