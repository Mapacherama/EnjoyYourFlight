/**
 * Repository responsible for keeping track of, and retrieving, all statistics.
 *
 * @author Noah Visser, Kenneth Mensah
 */
class statisticsRepository {

    constructor() {
        this.route = "/stats"
    }

    /**
     * Registers a visit to a page in the database for the current user.
     * @param page The page that has been visited.
     * @param timeSpent The time spent on the page in milliseconds.
     * @param pageData Page data to be stored in the database, can be left empty.
     * @returns {Promise<void>} An empty void.
     * @author Noah Visser
     */
    async visit(page, timeSpent, pageData) {
        if (typeof page === "undefined") throw new Error("Page not defined.");
        const user = sessionManager.get("username");
        if (typeof user === "undefined") throw new Error("No valid user has been found.");

        return await networkManager
            .doRequest(this.route + "/visit", {page: page, timeSpent: timeSpent, pageData: pageData, user: user});
    }

    /**
     * Asks the server to generate a CSV file for the page views.
     * @returns {Promise<string>} A token which can be used to find the CSV file. (/src/assets/csv/${token}.csv)
     * @author Noah Visser
     */
    async getAnalytics() {
        const user = sessionManager.get("username");
        return await networkManager
            .doRequest(this.route + "/getAnal", {session: user});
    }

    /**
     * Asks the server to generate a CSV file for all orders.
     * @returns {Promise<string>} A token which can be used to find the CSV file. (/src/assets/csv/${token}.csv)
     * @author Noah Visser
     */
    async getAllOrders() {
        const user = sessionManager.get("username");
        return await networkManager
            .doRequest(this.route + "/getAllOrders", {session: user});
    }

    //TODO: Figure out what it returns @Kenneth
    /**
     * Asks the server to export all the rows from the product table.
     * @returns ???
     * @author Kenneth Mensah
     */
    async exportProducts() {
        const user = sessionManager.get("username");
        return await networkManager
            .doRequest(this.route + "/exportProducts", {session: user});
    }

    /**
     * Asks the server to export all the rows from the product table.
     * @returns void
     * @author Kenneth Mensah
     */
    async insertProducts() {
        const user = sessionManager.get("username");
        return await networkManager
            .doRequest(this.route + "/insertProducts", {session: user});
    }

    /**
     * Asks the server to import all the rows from csv file to the product table.
     *
     * @returns void
     * @author Kenneth Mensah
     */
    async importProducts(array) {
        console.log(array);
        const user = sessionManager.get("username");
        return networkManager
            .doRequest(this.route + "/importProducts", {session: user, dataArray: array});
    }

    /**
     * Asks the server to empty all the rows from the userproduct table and product table.
     *
     * @returns void
     * @author Kenneth Mensah
     */
    async emptyProducts() {
        const user = sessionManager.get("username");
        return await networkManager
            .doRequest(this.route + "/emptyProducts", {session: user});
    }

}