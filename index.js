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
            choices: ["green", "blue", "pink", "red"]
        },
    ]).then(function (ans) {
        let data = { color: ans.color }
        gitHub(ans.userName,data);
    })
}
function gitHub (username,data) {
    const url = `https://api.github.com/users/${username}`;
    axios.get(url).then(function(res) {
       console.log(res.data);
       console.log(res.data.bio);
       console.log(res.data.avatar_url);
       data["bio"] = res.data.bio;
       data["profile_pic"] = res.data.avatar_url;
       data ["location"] = res.data.location;
       data["user_blog"] = res.data.blog;
       data ["followers"] = res.data.followers_url;
       data["following"] = res.data.following_url;
       data["starred_repositories"] - res.data.starred_url;
       data["number_of_public_repos"] = res.data.public_repos;
       

       generateHtml(data)
        });
  
}   
promptUser();