const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    var config = {
        method: 'post',
        url: "http://localhost:9103/intelliq_api/admin/resetall",
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
    .then(res => {
        console.log(chalk.green('Reset status: ' + res.status))
    })
    .catch(err => {
        console.log(chalk.red("Status:", err.response.data.status, "Reason:", err.response.data.reason));
    })
}