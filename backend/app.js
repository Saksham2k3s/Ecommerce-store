const express = require("express");
const app = express();
const error = require("./middleware/error");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());

// Enable CORS for all routes
app.use(cors());
// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
//middle ware for errors
app.use(error);

module.exports = app;
