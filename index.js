"use strict";
var express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

var app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
let telegram_url  = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN;
let botname       = "ballerbot"

// Bot response routines
app.post('*',function (req,res){
  const { message } = req.body
  if (typeof(message) === 'undefined' || typeof(message.text) === 'undefined') {
    // In case a message is not present do nothing and return an empty response
    return res.end('ok')
  }

  // Actual response routines
  const { text, chat } = message
  if (text.toLowerCase().indexOf('hi') >= 0 ){
    sendMessage('How you doin?',chat.id,res);
  }
  else{
    sendMessage("I don't know what you mean",chat.id,res);
  }
});

async function sendMessage(textToSend,chatid,res) {
  axios.post(telegram_url+"/sendMessage",{
    chat_id : chatid,
    text    : textToSend
  })
  .then(response => {
    console.log('Message posted')
    res.end('ok')
  })
  .catch(err => {
    console.log('Error :', err)
    res.end('Error :' + err)
  })
}
//

app.get('*', (req, res) => {
    res.status(200).send("<h1>BallerBot says hi</h1>")
});

module.exports = app;