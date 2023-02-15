const chalk = require('chalk');
const fs = require('fs');
const request = require('request');

module.exports = function(o) {
    console.log(o.source)
    var config = {
        method: 'post',
        url:'http://localhost:9103/intelliq_api/admin/questionnaire_upd',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        formData: {
            "file": fs.createReadStream(o.source)
        },
        rejectUnauthorized: false
    };
    request(config, function (err, data, body) {
        if (err) {
            console.log(chalk.red("This file doesn't exist!\nPlease choose an other file!"));
        }
        else {
            console.log(chalk.green("Questionnaire updated"));
        }
    });
}
