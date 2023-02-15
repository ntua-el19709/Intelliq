const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    var config = {
        method: 'post',
        url: `http://localhost:9103/intelliq_api/admin/resetq/${o.questionnaire_id}`,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
    .then(res => {
        console.log(chalk.green(`Questionnaire with ID = ${o.questionnaire_id} successfully deleted!`))
    })
    .catch(err => {
        console.log(chalk.red(`Something went wrong while deleting Questionnaire with ID = ${o.questionnaire_id}.`))
    })
    
}