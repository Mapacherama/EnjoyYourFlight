const db = require("../utils/databaseHelper");
const cryptoHelper = require("../utils/cryptoHelper");
const corsConfig = require("../utils/corsConfigHelper");
const commonTools = require("./common");

const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

const route = "/shop/";

/**
 * Shop related endpoints
 * @module Shop
 */

/**
 * Initializes all requests for the shop functions.
 * @param {Object} app An instance of express.
 * @param {pool} connectionPool The connection pool being used.
 * @private
 * @author Noah Visser
 */
function init(app, connectionPool) {
    console.log("Shop repository initializing...");

    /**
     * @api {post} /shop/productinformation Retrieve product information
     * @apiName ProductInformation
     * @apiGroup Shop
     *
     * @apiParam {Number[]} body The products you want to retrieve information of.
     *
     * @apiSuccess {String} title The title of the product.
     * @apiSuccess {String} description The description of the product.
     * @apiSuccess {String} image The path to the image of the product.
     * @apiSuccess {Number} price The price of the product in cents.
     * @apiSuccess {String} category The category of the product.
     * @apiSuccess {Number} id The ID of the product.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     [
     *       {
     *         "title": "tea",
     *         "description": "Yum",
     *         "image": "/path/to/image.jpg",
     *         "price": 200,
     *         "category": "drinks",
     *         "id": 1
     *       },
     *       {
     *         "title": "coffee",
     *         "description": "Yum",
     *         "image": "/path/to/image.jpg",
     *         "price": 250,
     *         "category": "drinks",
     *         "id": 2
     *       },
     *       ...
     *     ]
     */
    app.post(`${route}productinformation`, (req, res) => productinformation(connectionPool, req, res));

    /**
     * @api {post} /shop/allproducts Retrieve all product information
     * @apiName AllProductInformation
     * @apiGroup Shop
     *
     * @apiSuccess {String} title The title of the product.
     * @apiSuccess {String} description The description of the product.
     * @apiSuccess {String} image The path to the image of the product.
     * @apiSuccess {Number} price The price of the product in cents.
     * @apiSuccess {String} category The category of the product.
     * @apiSuccess {Number} id The ID of the product.
     * @apiSuccess {Number} quantity How many items of the product are in stock.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     [
     *       {
     *         "title": "tea",
     *         "description": "Yum",
     *         "image": "/path/to/image.jpg",
     *         "price": 200,
     *         "category": "drinks",
     *         "id": 1,
     *         "quantity": 30
     *       },
     *       {
     *         "title": "coffee",
     *         "description": "Yum",
     *         "image": "/path/to/image.jpg",
     *         "price": 250,
     *         "category": "drinks",
     *         "id": 2,
     *         "quantity": 41
     *       },
     *       ...
     *     ]
     */
    app.post(`${route}allproducts`, (req, res) => allproducts(connectionPool, req, res));

    /**
     * @api {post} /shop/getlastorder Retrieve the last order
     * @apiName GetLastOrder
     * @apiGroup Shop
     *
     * @apiSuccess {Number} body The last order number.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       5
     *     }
     */
    app.post(`${route}getlastorder`, (req, res) => getlastorder(connectionPool, req, res));

    /**
     * @api {post} /shop/createorder Create an order
     * @apiName CreateOrder
     * @apiGroup Shop
     *
     * @apiParam {Object[]} order An array of items in the order, the attributes are: "id" (the product ID) and "quantity".
     * @apiParam {String} seatNumber The seat number that's placing the order.
     * @apiParam {Number} orderNumber The order number.
     */
    app.post(`${route}createorder`, (req, res) => createorder(connectionPool, req, res));

    /**
     * @api {post} /shop/getmyorder Retrieve an order
     * @apiName GetMyOrder
     * @apiGroup Shop
     *
     * @apiParam {Number} seatNumber The seat number that you want to retrieve the latest order from.
     *
     * @apiSuccess {Number} order_number
     * @apiSuccess {String} seat_number
     * @apiSuccess {Number} id
     * @apiSuccess {String} title
     * @apiSuccess {Number} price
     * @apiSuccess {Number} quantity
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *         "order_number": 1,
     *         "seat_number": "8a",
     *         "id": 1,
     *         "title": "tea",
     *         "price": 200,
     *         "quantity": 3
     *       }
     */
    app.post(`${route}getmyorder`, (req, res) => getmyorder(connectionPool, req, res));

    // app.post(`${route}sortProduct`, (req, res) => sortProduct(connectionPool, req, res));

    console.log("Shop repository initialized!")
}

/**
 * Retrieves product information from given id's
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 * @author Marc Specht
 */
function productinformation(connectionPool, req, res) {
    const productList = req.body;
    let productId = [];
    try {
        for (let i = 0; i < productList.length; i++) {
            parseInt(productList[i].id);
            productId.push(productList[i].id);
        }
    } catch (e) {
        console.log(e);
        return;
    }

    db.handleQuery(connectionPool, {
        query: "SELECT title, description, image, price, category, id FROM product WHERE id in (" + productId.toString() + ")"
    }, (data) => {
        if (data.length > 0) {
            res.status(httpOkCode).json(data);
        }
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Get all products
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 * @author Marc Specht
 */
function allproducts(connectionPool, req, res) {
    commonTools.getAllProducts(connectionPool, (data) => {
        if (data.length > 0) {
            res.status(httpOkCode).json(data);
        }
    }, (err) => {
        res.status(badRequestCode).json({reason: err})
    });
}

/**
 * Get the last order from specific user
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 * @author Marc Specht
 */
function getlastorder(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "SELECT MAX(order_number) AS 'order_number' FROM userproduct"
    }, (data) => {
        if (data.length > 0) {
            res.status(httpOkCode).json(data[0].order_number);
        }
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Create a new order
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 * @author Marc Specht
 */
function createorder(connectionPool, req, res) {
    const order = req.body.order; //id + quantity
    const seatNumber = req.body.seatNumber;
    let orderNumber = req.body.orderNumber;
    orderNumber++;

    let query = `INSERT INTO userproduct (seat_number, id, quantity, order_number) VALUES`;
    for (let i = 0; i < order.length; i++) {
        query += `("${seatNumber}", ${order[i].id}, ${order[i].quantity}, ${orderNumber})`;
        if (i === order.length - 1) {
            query += `;`;
        } else {
            query += `,`;
        }
    }

    db.handleQuery(connectionPool, {
        query: query,
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => {
        res.status(badRequestCode).json({reason: err})
    });
}

/**
 * Get the latest order from specific user
 * @param {pool} connectionPool The current connectionPool
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 * @author Marc Specht
 */
function getmyorder(connectionPool, req, res) {
    const seatNumber = req.body.seatNumber;

    // Query selects the last order number by the given seatNumber
    db.handleQuery(connectionPool, {
        query: "SELECT order_number, r.seat_number, u.id, title, price, u.quantity FROM userproduct u INNER JOIN product p ON u.id = p.id INNER JOIN user r ON r.seat_number = u.seat_number WHERE order_number = (SELECT MAX(order_number) FROM userproduct WHERE seat_number = ?)",
        values: [seatNumber]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/*function sortProduct(connectionPool, req, res) {
    const category = req.body.category;

    db.handleQuery(connectionPool, {
        query: "SELECT * FROM product WHERE category = ?",
        values: [category]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}*/

module.exports = {
    /**
     * Initializes all requests for the shop functions.
     * @function
     * @param {Object} app An instance of express.
     * @param {Pool} connectionPool The connection pool being used.
     * @author Noah Visser
     */
    init
};