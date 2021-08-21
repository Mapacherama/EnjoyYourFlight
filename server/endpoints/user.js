const db = require("../utils/databaseHelper");
const cryptoHelper = require("../utils/cryptoHelper");
const corsConfig = require("../utils/corsConfigHelper");
const commonTools = require("./common");

const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

const route = "/user/";

/**
 * User related endpoints
 * @module User
 */

/**
 * Initializes all requests for the shop user functions.
 * @param {app} app An instance of express.
 * @param {pool} connectionPool The connection pool being used.
 * @author Noah Visser
 * @private
 */
function init(app, connectionPool) {
    console.log("User repository initializing...");

    /**
     * @api {post} /user/login Login
     * @apiName Login
     * @apiGroup User
     *
     * @apiParam {String} username The seat number that's being logged in with.
     * @apiParam {String} password The password associated with the seat number.
     *
     * @apiSuccess {String} seat_number The seat number of the account.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       "seat_number": "8a"
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "Wrong seat number and/or password"
     *     }
     */
    app.post(`${route}login`, (req, res) => login(connectionPool, req, res));

    /**
     * @api {post} /user/register Register
     * @apiName Register
     * @apiGroup User
     *
     * @apiParam {String} username The seat number to register.
     * @apiParam {String} password The password to register the seat number with.
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "This user has been blocked."
     *     }
     */
    app.post(`${route}register`, (req, res) => register(connectionPool, req, res));

    /**
     * @api {post} /user/passwordReset Make a password reset request
     * @apiName PasswordReset
     * @apiGroup User
     *
     * @apiParam {String} username The seat number that's requesting a password change.
     *
     * @apiSuccess {String} seat_number The seat number of the account.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       "seat_number": "8a"
     *     }
     *
     *     @apiErrorExample Blocked user
     *     HTTP/1.1 400
     *     {
     *       "reason": "This user has been blocked."
     *     }
     *
     *     @apiErrorExample Not registered
     *     HTTP/1.1 400
     *     {
     *       "reason": "This seat number has not been registered yet."
     *     }
     */
    app.post(`${route}passwordReset`, (req, res) => passwordReset(connectionPool, req, res));

    console.log("User repository initialized!")
}

/**
 * Checks the database for username/password match
 * If there is no match we return an error string
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Marc Specht, Noah Visser
 * @private
 */
function login(connectionPool, req, res) {
    const seatNumber = req.body.username.toLocaleUpperCase();
    const password = cryptoHelper.getHashedPassword(req.body.password);
    const ip = req.ip;

    commonTools.checkIfBlocked(connectionPool, ip, seatNumber, (boolean) => {
        if (boolean) {
            res.status(authorizationErrCode).json({reason: "This user has been blocked."});
            return;
        }

        db.handleQuery(connectionPool, {
            query: "SELECT seat_number, password FROM user WHERE seat_number = ? AND password = ?",
            values: [seatNumber, password]
        }, (data) => {
            if (data.length === 1) {
                //return just the username for now, never send password back!
                res.status(httpOkCode).json({"seat_number": data[0].seat_number});
            } else {
                //wrong username
                res.status(authorizationErrCode).json({reason: "Wrong seat number and/or password"});

            }

        }, (err) => res.status(badRequestCode).json({reason: err}));
    });
}

/**
 * Register a new account
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Marc Specht, Tico Vermeer
 * @private
 */
function register(connectionPool, req, res) {
    const seatNumber = req.body.username.toLocaleUpperCase();
    const password = cryptoHelper.getHashedPassword(req.body.password);
    const ip = req.ip;

    console.log(ip);

    commonTools.checkIfBlocked(connectionPool, ip, 0, (boolean) => {
        if (boolean) {
            res.status(authorizationErrCode).json({reason: "This user has been blocked."});
            return;
        }

        db.handleQuery(connectionPool, {
            query: "INSERT INTO user(seat_number, password, ipv6) VALUES (?,?,INET6_ATON(?))",
            values: [seatNumber, password, ip]
        }, (data) => {
            // if (data.insertId) {
            res.status(httpOkCode).json(data);
            // }
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        });
    });
}


/**
 * Check if user has been blocked, checks if the seat number is in the database and puts a notification in the database.
 * @param {pool} connectionPool.
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 */
function passwordReset(connectionPool, req, res) {
    const seatNumber = req.body.username.toLocaleUpperCase();
    const ip = req.ip;

    commonTools.checkIfBlocked(connectionPool, ip, seatNumber, (boolean) => {
        if (boolean) {
            res.status(authorizationErrCode).json({reason: "This user has been blocked."});
            return;
        }

        db.handleQuery(connectionPool, {
            query: "SELECT seat_number FROM user WHERE seat_number = ?",
            values: [seatNumber]
        }, (data) => {
            if (data.length === 1) {
                res.status(httpOkCode).json({"seat_number": data[0].seat_number});
                db.handleQuery(connectionPool, {
                    query: "INSERT INTO notifications(message, Seat_number) VALUES (?,?)",
                    values: [ 1, seatNumber]
                }, (data) => {
                    if (data.length === 1) {
                        //return just the username
                        res.status(httpOkCode).json({"seat_number": data[0].seat_number});
                    }
                }, (err) => res.status(badRequestCode).json({reason: err}));
            } else {
                //wrong username
                res.status(authorizationErrCode).json({reason: "This seat number has not been registered yet."});

            }
        }, (err) => res.status(badRequestCode).json({reason: err}));

    });
}


module.exports = {
    /**
     * Initializes all requests for the shop user functions.
     * @function
     * @param {Object} app An instance of express.
     * @param {Pool} connectionPool The connection pool being used.
     * @author Noah Visser
     */
    init
};