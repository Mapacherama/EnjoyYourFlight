const db = require("../utils/databaseHelper");
const cryptoHelper = require("../utils/cryptoHelper");
const corsConfig = require("../utils/corsConfigHelper");

const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

// The time to hold a file until deletion. (In milliseconds)
const FILE_HOLD_TIME = 30000;

const fs = require('fs');
const csv = require("fast-csv");

/**
 * Tools that are commonly used by the endpoints.
 * @module CommonTools
 */

/**
 * Checks whether a user is an admin.
 * @param {pool} connectionPool The connection pool being used.
 * @param {number} name The id of the user.
 * @param {function} callback The callback to be called when the query has been successful.
 * @param {function} err The callback to be called when an error has occurred.
 * @author Noah Visser
 * @private
 */
function isAdmin(connectionPool, name, callback, err) {
    db.handleQuery(connectionPool, {
        query: "SELECT is_admin FROM user WHERE seat_number=?",
        values: [name]
    }, (data) => {
        console.log(data);
        try {
            if (data[0].is_admin === 1) callback(true);
            else err(new Error("User isn't an administrator."))
        } catch (e) {
            err(e);
        }
    }, (err) => {
        try {
            err(err);
        }
        catch(e){
            // Do nothing
        }
    });
}

//TODO: Add error callback.
/**
 * Checks whether a user has been blocked.
 * @param {pool} connectionPool The connection pool being used.
 * @param {string} ip The IPv6 of the user.
 * @param {number} seat The id of the user.
 * @param {function} callback The callback to be called when the query has been successful.
 * @author Noah Visser
 * @private
 */
function checkIfBlocked(connectionPool, ip, seat, callback) {
    let blocked = false;
    db.handleQuery(connectionPool, {
        query: "SELECT is_blocked FROM user WHERE seat_number=?",
        values: [seat]
    }, (data) => {
        // for (let i = 0; i < data.length; i++) if (data[i].is_blocked === 1) blocked = true;
        callback(blocked);
    });
}

/**
 * Generates a CSV file based on the data that has been passed to it. This CSV file is temporarily kept in /src/assets/csv/
 * and will be deleted after the server shuts down, or after FILE_HOLD_TIME has passed.
 * @param {Array} array An array of objects to be stored in the CSV file.
 * @param {string} names The names of the attributes of the objects in the array that you want to store in the CSV file. The order of the names decides the order of the columns in the CSV file.
 * @returns {string} A unique code that can be used to retrieve the file. (/src/assets/csv/${code}.csv)
 * @author Noah Visser
 * @private
 */
function generateCSV(array, names) {
    let string = names.toString() + "\n";

    for (let i = 0; array.length > i; i++) {
        for (let j = 0; names.length > j; j++) string += `"${((array[i][names[j]] === null) ? "" : array[i][names[j]])}"${((names.length === j + 1) ? "" : ",")}`;
        string += "\n"
    }

    let random = cryptoHelper.generateAuthToken();
    fs.appendFile(`${global.wwwrootpath}/assets/csv/${random}.csv`, string, function (err) {
        if (err) console.log(err); //throw err;
    });

    setTimeout(() => deleteCSV(random), FILE_HOLD_TIME);
    return random;
}

async function deleteCSV(token) {

    fs.unlink(`${global.wwwrootpath}/assets/csv/${token}.csv`, function (err) {
        if (err) throw err;
        console.log(`${token}.csv deleted.`);
    });

}

/**
 * This method retrieves all products in the product table in MySQL.
 *
 * @param {pool} connectionPool. The connectionPool used
 * @param {function} callback. The Data Callback
 * @param {function} err. The error callback
 * @author Kenneth Mensah
 * @private
 */
function getAllProducts(connectionPool, callback, err) {

    db.handleQuery(connectionPool, {
        query: "SELECT id, title, description, image, price, category, quantity FROM product"
    }, (data) => {
        callback(data)
    }, (e) => err(e));
}

/**
 * This method imports the array that consists of the .csv file data.
 *
 * @param {Array} data Array from the importProducts method
 * @param {pool} connectionPool. The connectionPool used
 * @param {function} callback. The Data Callback
 * @param {function} err. The error callback
 * @author Noah Visser & Kenneth Mensah
 * @private
 */
function importProducts(data, connectionPool, callback, err) {

    if (!callback){
        callback = () => {}
    }

    if (!err){
        err = () => {}
    }

    console.log(data);

    db.handleQuery(connectionPool, {
        query: "INSERT INTO product (id, title, description, image, price, category, quantity) VALUES (?,?,?,?,?,?,?)",
        values: [data.id, data.title, data.description, data.image, data.price, data.category, data.quantity]
    }, (data) => {
        callback(data)
    }, (e) => err(e));
}


module.exports = {
    /**
     * Checks whether a user is an admin.
     * @function
     * @param {Pool} connectionPool The connection pool being used.
     * @param {number} name The id of the user.
     * @param {function} callback The callback to be called when the query has been successful.
     * @param {function} err The callback to be called when an error has occurred.
     * @author Noah Visser
     */
    isAdmin,
    /**
     * Checks whether a user has been blocked.
     * @function
     * @param {Pool} connectionPool The connection pool being used.
     * @param {string} ip The IPv6 of the user.
     * @param {number} seat The id of the user.
     * @param {function} callback The callback to be called when the query has been successful.
     * @author Noah Visser
     */
    checkIfBlocked,
    /**
     * Generates a CSV file based on the data that has been passed to it. This CSV file is temporarily kept in /src/assets/csv/
     * and will be deleted after the server shuts down, or after FILE_HOLD_TIME has passed.
     * @function
     * @param {Array} array An array of objects to be stored in the CSV file.
     * @param {string} names The names of the attributes of the objects in the array that you want to store in the CSV file. The order of the names decides the order of the columns in the CSV file.
     * @returns {string} A unique code that can be used to retrieve the file. (/src/assets/csv/${code}.csv)
     * @author Noah Visser
     */
    generateCSV,
    /**
     * This method retrieves all products in the product table in MySQL.
     * @function
     * @param {Pool} connectionPool The connectionPool used
     * @param {function} callback The Data Callback
     * @param {function} err The error callback
     * @author Kenneth Mensah
     */
    getAllProducts,
    /**
     * This method imports the array that consists of the .csv file data.
     * @function
     * @param {Array} data Array from the importProducts method
     * @param {Pool} connectionPool The connectionPool used
     * @param {function} callback The Data Callback
     * @param {function} err The error callback
     * @author Noah Visser, Kenneth Mensah
     */
    importProducts
};