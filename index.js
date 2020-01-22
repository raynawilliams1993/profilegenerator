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
        gitHub(ans.userName, data);
    })
}
function gitHub(username, data) {
    const url = `https://api.github.com/users/${username}`;
    axios.get(url).then(function (res) {
        console.log(res.data);
        console.log(res.data.bio);
        console.log(res.data.avatar_url);
        data["bio"] = res.data.bio;
        data["profile_pic"] = res.data.avatar_url;
        data["location"] = res.data.location;
        data["user_blog"] = res.data.blog;
        data["followers"] = res.data.followers_url;
        data["following"] = res.data.following_url;
        data["starred_repositories"] - res.data.starred_url;
        data["number_of_public_repos"] = res.data.public_repos;

        generateHtml(data)
    });
    var fs = require('fs'),
        convertFactory = require('electron-html-to');

    var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });

    conversion({ html: '<h1>Hello World</h1>' }, function (err, result) {
        if (err) {
            return console.error(err);
        }

        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });
}
function generatePDF(fileHTML, filePDF) {
    var html = fs.readFileSync(fileHTML, 'utf8');
    // var options = { format: 'Letter' };
    
    pdf.create(html).toFile(filePDF, function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }
promptUser();