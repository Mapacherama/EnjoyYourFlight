/**
 * Server application - contains all server config and api endpoints
 * @module App
 * @author Pim Meijer & Noah Visser
 */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./utils/databaseHelper");
const cryptoHelper = require("./utils/cryptoHelper");
const corsConfig = require("./utils/corsConfigHelper");
const app = express();
const fileUpload = require("express-fileupload");

const adminRepo = require("./endpoints/admin");
const shopRepo = require("./endpoints/shop");
const statRepo = require("./endpoints/stats.js");
const userRepo = require("./endpoints/user.js");

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

// File uploads
app.use(fileUpload());

// ------ ROUTES - add all api endpoints here ------
const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

// Initialize all admin function listeners.
adminRepo.init(app, connectionPool);
shopRepo.init(app, connectionPool);
statRepo.init(app, connectionPool);
userRepo.init(app, connectionPool);


module.exports = app;