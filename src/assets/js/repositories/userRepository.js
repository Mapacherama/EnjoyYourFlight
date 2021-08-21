/**
 * Repository responsible for all user data from server - CRUD
 * Make sure all functions are using the async keyword when interacting with network!
 *
 * @author Pim Meijer, Marc Specht
 */
class UserRepository {

    constructor() {
        this.route = "/user"
    }

    /**
     * Request to create an account
     * @param seatNumber given seat number
     * @param password given password
     * @returns {Promise<unknown>} request
     * @author Marc Specht
     */
    async create(seatNumber, password){
         return await networkManager
             .doRequest(this.route, {seatNumber: seatNumber, password: password});
    }

    /**
     * async function that handles a Promise from the networkmanager
     * @param username given username
     * @param password given password
     * @returns {Promise<user>} request
     * @author Marc Specht
     */
    async login(username, password) {
        return await networkManager
            .doRequest(`${this.route}/login`, {"username": username, "password": password});
    }

    /**
     * Async function that handles a Promise from the networkmanager.
     * @param username
     * @returns {Promise<user>}
     * @author Tico Vermeer
     */
    async passwordReset(username) {
        return await networkManager
            .doRequest(`${this.route}/passwordReset`, {"username": username});
    }

    /**
     * async function that handles a Promise from the networkmanager
     * @param username
     * @param password
     * @returns {Promise<user>}
     * @author Marc Specht
     */
    async register(username, password) {
        return await networkManager
            .doRequest(`${this.route}/register`, {"username": username, "password": password});
    }
}