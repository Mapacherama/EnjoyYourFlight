const db = require("../utils/databaseHelper");
const cryptoHelper = require("../utils/cryptoHelper");
const corsConfig = require("../utils/corsConfigHelper");
const commonTools = require("./common");

const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

const route = "/admin/";

/**
 * Admin related endpoints
 * @module Admin
 */

/**
 * Initializes all the possible requests for the admin functions.
 * @param {app} app An instance of express.
 * @param {pool} connectionPool The connection pool being used.
 * @author Noah Visser
 * @private
 */
function init(app, connectionPool) {
    console.log("Admin repository initializing...");

    /**
     * @api {post} /admin/users Retrieve all user seat numbers and block states.
     * @apiName GetUsers
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {String} seat_number The seat numbers.
     * @apiSuccess {Number} is_blocked Whether the user is blocked.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     [
     *       {
     *         "seat_number": "8a",
     *         "is_blocked": 1
     *       },
     *       {
     *         "seat_number": "8b",
     *         "is_blocked": 0
     *       },
     *       ...
     *     ]
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}users`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => getUsers(connectionPool, req, res), () => res.status(badRequestCode).json({reason: "User isn't an admin."}))
    );

    /**
     * @api {post} /admin/updateName Update a seat number
     * @apiName ChangeName
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     * @apiParam {String} oldSeat The seat number you'd like to change the password of.
     * @apiParam {String} newSeat The string to change the seat number to.
     *
     * @apiSuccess {Boolean} body Defaults to true.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       true
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}updateName`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => updateUsername(connectionPool, req, res), () => res.status(badRequestCode).json({reason: "User isn't an admin."}))
    );

    /**
     * @api {post} /admin/updatePassword Update a password
     * @apiName ChangePassword
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     * @apiParam {String} id The seat number you'd like to change the password of.
     * @apiParam {String} password The string to change the password to.
     *
     * @apiSuccess {Boolean} body Defaults to true.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       true
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}updatePassword`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => updateUserPassword(connectionPool, req, res), () => res.status(badRequestCode).json({reason: "User isn't an admin."}))
    );

    /**
     * @api {post} /admin/deleteUser Delete a user
     * @apiName DeleteUser
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     * @apiParam {String} id The seat number of the account you want to delete.
     *
     * @apiSuccess {Boolean} body Defaults to true.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       true
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}deleteUser`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => deleteUser(connectionPool, req, res), () => res.status(badRequestCode).json({reason: "User isn't an admin."}))
    );

    /**
     * @api {post} /admin/blockUser Block/unblock a user
     * @apiName BlockUser
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     * @apiParam {String} id The seat number of the account you want to block or unblock.
     * @apiParam {Boolean} blockState Whether you want to block or unblock the user.
     *
     * @apiSuccess {Boolean} body Defaults to true.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       true
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}blockUser`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => blockUser(connectionPool, req, res), () => res.status(badRequestCode).json({reason: "User isn't an admin."}))
    );

    /**
     * @api {post} /admin/isAdmin Check whether a user is an admin.
     * @apiName IsAdmin
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {Boolean} body Whether the user is an admin.
     *
     * @apiSuccessExample User is an admin
     *      HTTP/1.1 200 OK
     *     {
     *       true
     *     }
     *
     * @apiSuccessExample User is not an admin
     *      HTTP/1.1 200 OK
     *     {
     *       false
     *     }
     */
    app.post(`${route}isAdmin`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => res.status(httpOkCode).json(true), () => res.status(httpOkCode).json(false))
    );

    /**
     * @api {post} /admin/getOpenOrders Retrieve all open orders
     * @apiName GetOpenOrders
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {Number} order_number The order number.
     * @apiSuccess {String} seat_number The seat number of the user who placed the order.
     * @apiSuccess {Number} id The ID of the product in the order.
     * @apiSuccess {String} title The title of the product in the order.
     * @apiSuccess {Number} price The price of the product in the order.
     * @apiSuccess {Number} quantity The quantity of the product in the order.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     [
     *       {
     *         "order_number": 1,
     *         "seat_number": "8a",
     *         "id": 1,
     *         "title": "tea",
     *         "price": 200,
     *         "quantity": 3
     *       },
     *       {
     *         "order_number": 2,
     *         "seat_number": "8b",
     *         "id": 1,
     *         "title": "tea",
     *         "price": 200,
     *         "quantity": 1
     *       },
     *       {
     *         "order_number": 3,
     *         "seat_number": "8b",
     *         "id": 3,
     *         "title": "coffe",
     *         "price": 250,
     *         "quantity": 2
     *       },
     *       ...
     *     ]
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}getOpenOrders`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => getOpenOrders(connectionPool, req, res), () => res.status(httpOkCode).json(false))
    );

    /**
     * @api {post} /admin/setOrder Set an order status
     * @apiName SetOrder
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     * @apiParam {Number} orderNumber The order to change the status of.
     * @apiParam {Number} status The status to set the order to.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}setOrder`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => setOrder(connectionPool, req, res), () => res.status(httpOkCode).json(false))
    );

    /**
     * @api {post} /admin/getNotification Retrieve all notifications
     * @apiName GetNotification
     * @apiGroup Admin
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {String} message The notification message.
     * @apiSuccess {String} Seat_number The seat number that created the notification.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     [
     *       {
     *         "message":"",
     *         "Seat_number":"8a"
     *       },
     *       {
     *         "message":"",
     *         "Seat_number":"8b"
     *       },
     *       ...
     *     ]
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}getNotification`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => getNotification(connectionPool, req, res), () => res.status(httpOkCode).json(false))
    );

    /**
     * @api {post} /admin/setNotification Set a notification
     * @apiName SetNotification
     * @apiGroup Admin
     *
     * @apiParam {String} message The message of the notification.
     * @apiParam {String} seatNumber The seat number of the user who created the notification.
     *
     */
    app.post(`${route}setNotification`, (req, res) => setNotification(connectionPool, req, res));

    /**
     * @api {post} /admin/deleteNotification Delete a notification
     * @apiName deleteNotification
     * @apiGroup Admin
     *
     * @apiParam {String} message The message of the notification.
     * @apiParam {String} seatNumber The seat number of the user who created the notification.
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}deleteNotification`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, () => deleteNotification(connectionPool, req, res), () => res.status(httpOkCode).json(false))
    );

    console.log("Admin repository initialized!")
}

/**
 * @author Noah Visser
 *
 * Fetches all users from the database, and sends them back.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 */
function getUsers(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "SELECT seat_number, is_blocked FROM user"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * @author Noah Visser
 *
 * Updates an id in the database and sends back 'true' if it's been successful.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 */
function updateUsername(connectionPool, req, res) {
    const oldSeat = req.body.oldSeat;
    const newSeat = req.body.newSeat.toLocaleUpperCase();

    db.handleQuery(connectionPool, {
        query: "UPDATE user SET seat_number=? WHERE seat_number=?",
        values: [newSeat, oldSeat]
    }, (data) => {
        res.status(httpOkCode).json(true);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * @author Noah Visser
 *
 * Updates a password in the database and sends back 'true' if it's been successful.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 */
function updateUserPassword(connectionPool, req, res) {
    const seatNr = req.body.id;
    const password = cryptoHelper.getHashedPassword(req.body.password);

    db.handleQuery(connectionPool, {
        query: "UPDATE user SET password=? WHERE seat_number=?",
        values: [password, seatNr]
    }, (data) => {
        res.status(httpOkCode).json(true);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Deletes an entry from the user table in the database. Sends back 'true' if it's been successful.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Noah Visser
 * @private
 */
function deleteUser(connectionPool, req, res) {
    const id = req.body.id;

    db.handleQuery(connectionPool, {
        query: "DELETE FROM user WHERE seat_number=?",
        values: [id]
    }, (data) => {
        res.status(httpOkCode).json(true);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Blocks a user in the user table in the database. Sends back 'true' if it's been successful.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Noah Visser
 * @private
 */
function blockUser(connectionPool, req, res) {
    const seat = req.body.seat;
    const blockState = req.body.blockState ? 1 : 0;
    db.handleQuery(connectionPool, {
        query: "UPDATE user SET is_blocked=? WHERE seat_number=?",
        values: [blockState, seat]
    }, (data) => {
        res.status(httpOkCode).json(true);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Get all unhandled orders
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Marc Specht
 * @private
 */
function getOpenOrders(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "SELECT order_number, seat_number, u.id, title, price, u.quantity FROM userproduct u INNER JOIN product p ON u.id = p.id WHERE order_status = 0",
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Update and order status
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Marc Specht
 * @private
 */
function setOrder(connectionPool, req, res) {
    const orderNumber = req.body.orderNumber; //id + quantity
    const status = req.body.status;

    db.handleQuery(connectionPool, {
        query: "UPDATE userproduct SET order_status = ? WHERE order_number = ?",
        values: [status, orderNumber]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => {
        res.status(badRequestCode).json({reason: err})
    });
}

/**
 * Gets all notifications from the database
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Jerôme Tesselaar
 * @private
 */

function getNotification(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "SELECT message, Seat_number FROM notifications"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}


/**
 * Sends a notification message to the notification table of the database, takes two variables: one for the message part,
 * and another for the seat number of the user that sends the message.
 * @param connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Jerôme Tesselaar
 * @private
 */

function setNotification(connectionPool, req, res) {
    const message = req.body.message;
    const seatNumber = req.body.seatNumber;
    db.handleQuery(connectionPool, {
        query: "INSERT INTO notifications (message, Seat_number) VALUES (?, ?) ",
        values: [message, seatNumber]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Delete's the notification from the notification table, gets deleted based on two variables: the message and secondly
 * the seat number of the user.
 * @param {pool} connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @author Jerôme Tesselaar
 * @private
 */

function deleteNotification(connectionPool, req, res) {
    const message = req.body.message;
    const seatNumber = req.body.seatNumber;

    db.handleQuery(connectionPool, {
        query: "DELETE FROM notifications WHERE message = ? AND Seat_number = ?",
        values: [message, seatNumber]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

module.exports = {
    /**
     * Initializes all the possible requests for the admin functions.
     * @function
     * @param {Object} app An instance of express.
     * @param {Pool} connectionPool The connection pool being used.
     * @author Noah Visser
     */
    init
};