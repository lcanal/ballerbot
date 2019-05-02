"use strict";

const axios = require("axios");
const NBA = require("nba");
const asTable = require ('as-table');
require("dotenv").config();

asTable.configure({ maxTotalWidth: 32, right: true});
let telegram_url  = "https://api.telegram.org/bot" + process.env.TEL_API_TOKEN;

module.exports = [
    {
        name    : 'hi',
        method  : hiMethod
    },
    {
        name    : 'hustlas',
        method  : hustlas
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

async function hustlas(text,chat_id,res){
    const hustlersParams =  {
        SeasonType: "Playoffs"
    }
    console.log("Attempting send...");
    const response = await NBA.stats.playerHustleLeaders(hustlersParams).catch( e => {
        console.log("Error " + e);
        sendMessage("I couldn't query NBA api site. Sorry",chat_id,res);
        return
    });
    
    const { resultSets } = response;

    resultSets.forEach(result => {
        let dataTable = [];
        // let msg = response.parameters.Season + " " + response.parameters.SeasonType +
        //     " - " + result.name + "\n";
        let msg = "";
    
        //Drop player_id and team_id from response. This could very well break 
        //should any shifts occur
        result.headers.splice(0,1);
        result.headers.splice(1,1);
        result.headers[0] = "PLAYER"
        result.headers[1] = "TEAM"

        dataTable.push(result.headers);
        result.rowSet.forEach((row,index) => {
            //Drop player_id and team_id from row. This could very well break 
            //should any shifts occur
            row.splice(0,1);
            row.splice(1,1);
            dataTable.push(row)
        });

        msg += "``` " + asTable.configure({ delimiter: ' | ', right: false}) (dataTable) + " ```";
        sendMessage(msg,chat_id,res)
    });
    res.end('ok')
}

async function scoreBoardGet(date,chat_id,res) {
    // if (typeof(date) === 'undefined' || date.length <= 0 )
    //     date = await getFormattedDate(new Date());
    
    // let scoreParms = {
    //     gameDate: date
    // };

    // const score = await NBA.stats.scoreboard(scoreParms);
    // console.log(JSON.stringify(score));    
    // res.end('ok');
    sendMessage("Working on it... ",chat_id,res);
    //sendMessage(score,chat_id,res);
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
