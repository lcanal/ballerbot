"use strict";

const axios = require("axios");
const NBA = require("nba");
//const JSON = require("JSON");
let telegram_url  = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN;
require("dotenv").config();

module.exports = [
    {
        name    : 'hi',
        method  : hiMethod
    },
    {
        name    : 'hustlers',
        method  : hustlers
    },
    {
        name    : 'scoreboard',
        method  : scoreBoardGet
    },
    {
        name    : 'unknown',
        method  : unknownCommand
    }
];

async function hiMethod(text,chat_id,res){
    sendMessage('How you doin?',chat_id,res);
}

async function hustlers(text,chat_id,res){
    const hustlersParams =  {
        SeasonType: "Playoffs"
    }
    const leaders = await NBA.stats.teamHustleLeaders(hustlersParams);
    //console.log(leaders)
    console.log(JSON.stringify(leaders));
    sendMessage('Still learning this one...',chat_id,res);
}

async function scoreBoardGet(date,chat_id,res) {
    if (typeof(date) === 'undefined' || date.length <= 0 )
        date = await getFormattedDate(new Date());
    
    let scoreParms = {
        gameDate: date
    };

    const score = await NBA.stats.scoreboard(scoreParms);
    console.log(JSON.stringify(score));    
    res.end('ok');
    sendMessage("Working on it... ",chat_id,res);
    //sendMessage(score,chat_id,res);
}

async function unknownCommand(text,chat_id,res){
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

async function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}
