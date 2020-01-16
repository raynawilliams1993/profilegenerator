const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHtml = require("./generatehtml");
const writeFileAsync = util.promisify(fs.writeFile);
const axios = require("axios");

function promptUser() {
    return inquirer.prompt([ 
        {
            type: "input",
            name: "userName",
            message: "What is your github user name?"
        },
        {
            type: "list",
            name: "color",
            message: "What is your favorite color?",
            choices:["green","blue","pink","red"]
        },
    ]).then(function(ans){
        let data = {color: ans.color}
    })