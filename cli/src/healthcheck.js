const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    var config = {
        method: 'get',
        url: "http://localhost:9103/intelliq_api/admin/healthcheck",
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
    .then(res => {
        console.log(chalk.green('Connection status with database: ' + res.data.status))
    })
    .catch(err => {
        console.log(chalk.red('Connection status with database: ' + err.response.status));
    })
    
}