"use strict";

const axios = require("axios");
let telegram_url  = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN;
require("dotenv").config();

module.exports = [
    {
        name    : 'hi',
        method  : hiMethod
    },
    {
        name    : 'nbatopscorer',
        method  : nbaTopScorer
    },
    {
        name    : 'unknown',
        method  : unknownCommand
    }
];

async function hiMethod(chat_id,res){
    sendMessage('How you doin?',chat_id,res);
}

async function nbaTopScorer(chat_id,res){
    
    sendMessage('Still learning this one...',chat_id,res)
}

async function unknownCommand(chat_id,res){
    sendMessage("I don't know what you mean",chat_id,res);
}


//Lower level functions
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