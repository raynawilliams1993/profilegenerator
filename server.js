const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHtml = require("./generatehtml");
const writeFileAsync = util.promisify(fs.writeFile);
const axios = require("axios");
const pdf = require("html-pdf");

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
            choices: ["green", "blue", "pink", "red"]
        },
    ]).then(function (ans) {
        let data = { color: ans.color }
        gitHub(ans.userName, data);
    })
}
function gitHub(username, data) {
    const url = `https://api.github.com/users/${username}`;
    axios.get(url).then(function (res) {
        console.log(res.data);
        console.log(res.data.bio);
        console.log(res.data.avatar_url);
        data["username"]= res.data.login;
        data["bio"] = res.data.bio;
        data["profile_pic"] = res.data.avatar_url;
        data["location"] = res.data.location;
        data["user_blog"] = res.data.blog;
        data["followers"] = res.data.followers;
        data["following"] = res.data.following;
        data["starred"] = res.data.public_gists;
        data["public_repos"] = res.data.public_repos;

       const fileHTML = generateHtml(data);
       generatePDF(fileHTML)
    });
  
}
function generatePDF(fileHTML) {
    
    
    pdf.create(fileHTML).toFile("./output/index.pdf", function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }

promptUser();
