"use strict";

const axios = require("axios");
require("dotenv").config();

let telegram_url  = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN;

module.exports = [
    {
        name    : 'hi',
        method  : hiMethod
    },
    {
        name    : 'unknown',
        method  : unknownCommand
    }
];

async function hiMethod(text,chat_id,res){
    sendMessage('How you doin?',chat_id,res);
}

async function unknownCommand(text,chat_id,res){
    sendMessage(text,chat_id,res);
}

//Lower level functions
async function sendMessage(textToSend,chatid,res) {
    console.log("Sending msg: \n" + textToSend);
    console.log("To ChatID: " + chatid);
    axios.post(telegram_url+"/sendMessage?parse_mode=markdown",{
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

async function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}
