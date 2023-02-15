const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    var config = {
        method: 'post',
        url: `http://localhost:9103/intelliq_api/doanswer/${o.questionnaire_id}/${o.question_id}/${o.session_id}/${o.option_id}`,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
    .then(res => {
        console.log(chalk.green(`Successfully answered to Question with ID = ${o.question_id} of Questionnaire with ID = ${o.questionnaire_id}!`))
    })
    .catch(err => {
        console.log(chalk.red(`Something went wrong while answering to Question with ID = ${o.question_id} of Questionnaire with ID = ${o.questionnaire_id}`));
    })
    
}