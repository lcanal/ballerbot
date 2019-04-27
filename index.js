"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const commands = require("./commands")
let app = express();
app.use(bodyParser.json());

// Bot response routines
app.post('*',async function (req,res){
  const { message } = req.body
  if (typeof(message) === 'undefined' || typeof(message.text) === 'undefined') {
    // In case a message is not present do nothing and return an empty response
    return res.end('ok')
  }

  // Actual response routines
  const { text, chat } = message;
  for (const command of commands) {
    if (text.toLowerCase().indexOf(command.name) >= 0) {
      await command.method(chat.id,res);
      return 
    }
  }
  
  //No Matches
  const [ unknown ] = commands.slice(-1)
  console.log(unknown);
  await unknown.method(chat.id,res);
});

app.get('*', (req, res) => {
    res.status(200).send("<h1>BallerBot says hi</h1>")
});

module.exports = app;