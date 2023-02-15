const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    if (o.format === 'csv') format = 'csv';
    else format = 'json'

    var config = {
        method: 'get',
        url: `http://localhost:9103/intelliq_api/questionnaire/${o.questionnaire_id}?format=${format}`,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };

    axios(config)
    .then(res => {
        console.dir(res.data, { depth: null })
    })
    .catch(err => {
        console.log(chalk.red('Error sth went wrong'));
    })
}