const db = require("../utils/databaseHelper");
const cryptoHelper = require("../utils/cryptoHelper");
const corsConfig = require("../utils/corsConfigHelper");
const commonTools = require("./common");

const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

const route = "/stats/";

/**
 * Statistic related endpoints
 * @module Stats
 */

/**
 * Initializes all the possible requests for the statistics functions.
 * @param {app} app An instance of express.
 * @param {pool} connectionPool The connection pool being used.
 * @author Noah Visser
 * @private
 */
function init(app, connectionPool) {
    console.log("Statistics repository initializing...");

    /**
     * @api {post} /stats/visit Visit page
     * @apiName Visit
     * @apiGroup Stats
     *
     * @apiParam {String} page The page that has been visited.
     * @apiParam {String} pageData Extra page data if there is any.
     * @apiParam {String} user The user that visited the page.
     * @apiParam {Number} timeSpent The time spent on the page in milliseconds.
     */
    app.post(`${route}visit`, (req, res) => visit(connectionPool, req, res));

    /**
     * @api {post} /stats/getAnal Retrieve the analytics
     * @apiName GetAnalytics
     * @apiGroup Stats
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {String} body The token which can be used to retrieve the analytics file from /src/assets/csv/{token}.csv.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       "token"
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}getAnal`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, ()=> getAnalytics(connectionPool, req, res), (e) => res.status(badRequestCode).json({reason: e}))
    );

    /**
     * @api {post} /stats/getAllOrders Retrieve all orders
     * @apiName GetAnalytics
     * @apiGroup Stats
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {String} body The token which can be used to retrieve the orders file from /src/assets/csv/{token}.csv.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       "token"
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}getAllOrders`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, ()=> getAllOrders(connectionPool, req, res), (e) => res.status(badRequestCode).json({reason: e}))
    );

    /**
     * @api {post} /stats/exportProducts Retrieve the current products in the shop
     * @apiName ExportProducts
     * @apiGroup Stats
     *
     * @apiParam {String} session The user session.
     *
     * @apiSuccess {String} body The token which can be used to retrieve the products file from /src/assets/csv/{token}.csv.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *     {
     *       "token"
     *     }
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}exportProducts`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, ()=> exportProducts(connectionPool, req, res), (e) => res.status(badRequestCode).json({reason: e}))
    );

    /**
     * @api {post} /stats/importProducts Import products in shop
     * @apiName ImportProducts
     * @apiGroup Stats
     *
     * @apiParam {String} session The user session.
     * @apiParam {Object[]} dataArray The data to import to the product selection.
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}importProducts`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, ()=> importProduct(connectionPool, req, res), (e) => res.status(badRequestCode).json({reason: e}))
    );

    /**
     * @api {post} /stats/emptyProducts Empty the product list of the shop
     * @apiName EmptyProducts
     * @apiGroup Stats
     *
     * @apiParam {String} session The user session.
     *
     *     @apiErrorExample Error-Response:
     *     HTTP/1.1 400
     *     {
     *       "reason": "User isn't an admin."
     *     }
     */
    app.post(`${route}emptyProducts`, (req, res) =>
        commonTools.isAdmin(connectionPool, req.body.session, ()=> emptyProducts(connectionPool, req, res), (e) => res.status(badRequestCode).json({reason: e}))
    );

    console.log("Statistics repository initialized!")
}

/**
 * Registers a visit to a page in the database.
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request. {page: Page in question, pageData: Data of the page to be stored, user: The user visiting the page, timeSpent: Time spent on the page}
 * @param {res} res The response.
 * @author Noah Visser
 * @private
 */
function visit(connectionPool, req, res) {
    const page = req.body.page;
    const pageData = req.body.pageData;
    const user = req.body.user;
    const timeSpent = req.body.timeSpent;

    db.handleQuery(connectionPool, {
        query: "INSERT INTO visit (user, page, time_spent, page_data) VALUES (?, ?, ?, ?)",
        values: [user, page, timeSpent, pageData]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Retrieves all the analytic data from the database and generates a CSV file to be downloaded by the client.
 * It responds with a random key which can be used to find the file on the client-side. (${key}.csv)
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request. A session is expected.
 * @param {res} res The response.
 * @author Noah Visser
 * @private
 */
function getAnalytics(connectionPool, req, res) {

    db.handleQuery(connectionPool, {
        query: "SELECT user, time, time_spent, page, page_data FROM visit",
    }, (data) => {
        res.status(httpOkCode).json(commonTools.generateCSV(data, ["user", "time", "time_spent", "page", "page_data"]));
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * Retrieves all the order data from the database and generates a CSV file to be downloaded by the client.
 * It responds with a random key which can be used to find the file on the client-side. (${key}.csv)
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request. A session is expected.
 * @param {res} res The response.
 * @author Noah Visser
 * @private
 */
function getAllOrders(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "SELECT a1.seat_number, a1.order_number, a2.id as product_id , a2.title as product, a2.category, a2.price FROM userproduct as a1" +
            " INNER JOIN product as a2 on a1.id=a2.id ORDER BY a1.order_number",
    }, (data) => {
        res.status(httpOkCode).json(commonTools.generateCSV(data, ["seat_number", "order_number", "product_id", "product", "category", "price"]));
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 *
 * @author Noah Visser & Kenneth Mensah
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request. A session is expected.
 * @param {res} res The response.
 * @private
 */
function exportProducts(connectionPool, req, res){
    commonTools.getAllProducts(connectionPool, (data) => {
        res.status(httpOkCode).json(commonTools.generateCSV(data, ["id", "title", "description", "image", "category", "price", "quantity"]));
    }, (err) => res.status(badRequestCode).json({reason: err}));
}

/**
 * This function requests the array from the file imported via the readFile function (client-side) and turns this into
 * an array which splits each entry. The array gets fed to another importProducts which adds the products to the database.
 *
 * @author Kenneth Mensah & Noah Visser
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request. A array is expected
 * @param {res} res The response.
 * @private
 */
function importProduct(connectionPool, req, res) {
    // Good luck to the person who has to work with this.

    const data = req.body.dataArray; // Array from the importProducts function (client-side).

    try {
        let attr = data[0]; // This array is the first line of the .csv file, which should be all the attributes in the database.

        attr = attr.split("\\\"").join(String.fromCharCode(7)).split(/([,;])(?=(?:([^"'])|["'][^"']*["'])*$)/g);
        // console.log(attr);
        let indexesAttr = []; // This is the index of the attributes
        for (let i = 2; i < attr.length; i++){
            if(((i + 1) % 3) === 0) indexesAttr.push(i - 1);
        }
        for (let j = indexesAttr.length - 1; j >= 0; j--) attr.splice(indexesAttr[j], 2);
        attr = attr.join(String.fromCharCode(6)).split("\"").join("").split(String.fromCharCode(7)).join("\"").split(String.fromCharCode(6));
        console.log(attr);


        for (let i = 1; i < data.length; i++) {
            let rowData = {}; // This rowData is used for sorting the data from the .csv file.
            let row = data[i]; // This row is the data from the array

            if((row.match(/(;)(?=(?:([^"'])|["'][^"']*["'])*$)/g) || []).length <= 1) row = row.split("\\\"").join(String.fromCharCode(7)).split(/(,)(?=(?:([^"'])|["'][^"']*["'])*$)/g);
            else row = row.split("\\\;").join(String.fromCharCode(5)).split(/(;)(?=(?:([^"'])|["'][^"']*["'])*$)/g);

            let indexes = [];
            for (let j = 2; j < row.length; j++) {
                if (((j + 1) % 3) === 0) indexes.push(j - 1);
            }

            for (let k = indexes.length - 1; k >= 0; k--) row.splice(indexes[k], 2);
            row = row.join(String.fromCharCode(6)).split("\"").join("").split(String.fromCharCode(7)).join("\"").split(String.fromCharCode(5)).join(";").split(String.fromCharCode(6));
            for (let l = 0; l < row.length; l++) rowData[attr[l].replace("\r", "")] = row[l].replace("\r", "");

            commonTools.importProducts(rowData, connectionPool, () => res.status(httpOkCode).json());
        }


    } catch (e) {
        console.log(e);
    }
    res.status(httpOkCode).json();
}

/**
 * This method empties the userproduct table first then the product table. This is used for adding new products to the
 * product table.
 *
 * @author Kenneth Mensah & Noah Visser
 * @param {pool} connectionPool The connection pool being used.
 * @param {req} req The request.
 * @param {res} res The response.
 * @private
 */
function emptyProducts(connectionPool, req, res) {
    db.handleQuery(connectionPool, {
        query: "DELETE FROM userproduct",
    }, (data) => {
        db.handleQuery(connectionPool, {
            query: "DELETE FROM product",
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err}));
    }, (err) => res.status(badRequestCode).json({reason: err}));

}

module.exports = {
    /**
     * Initializes all the possible requests for the statistics functions.
     * @function
     * @param {Object} app An instance of express.
     * @param {Pool} connectionPool The connection pool being used.
     * @author Noah Visser
     */
    init
};