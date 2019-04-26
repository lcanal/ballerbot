var express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();


var app = express();
app.use(bodyParser.json());
let telegram_url = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN +"/sendMessage";

app.get('*', (req, res) => {
    res.status(200).send('<h1>Hello, world!</h1>')
})

module.exports = app;