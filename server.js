var express = require("express")
var app = express()
var db = require("./database.js")
const cors =require("cors");
var bodyParser = require("body-parser");
const path = require('path');
const commonMiddleware = require('./middlewares/common-middleware');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

global.db = db;
global.appRoot = path.resolve(__dirname);
var HTTP_PORT = 8001
//Models,routes & middlewares
require('./middlewares/auth');
app.use('/api',require('./routes'));
app.use('/api',commonMiddleware.responseHandler);
app.use('/api',commonMiddleware.errorHandler);
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

