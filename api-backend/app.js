const express = require('express');
const bodyParser = require('body-parser');

/* ROUTES and how to import routes */
const healthcheck = require('./api/admin/healthcheck');
const questionnaire_upd = require('./api/admin/questionnaire_upd');
const resetall = require('./api/admin/resetall');
const resetq = require('./api/admin/resetq');
const getallquestionnaires = require('./api/admin/getallquestionnaires');

const questionnaire = require('./api/questionnaire');
const question = require('./api/question');
const doanswer = require('./api/doanswer');
const getsessionanswers = require('./api/getsessionanswers');
const getquestionanswers = require('./api/getquestionanswers');
/* end of ROUTES and how to import routes */

const app = express();

console.log(`NODE_ENV = |${process.env.NODE_ENV}|`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-OBSERVATORY-AUTH");
    next();
});

// /* Routes used by our project */
const baseurl = '/intelliq_api';

app.use(baseurl + '/admin/healthcheck', healthcheck);
app.use(baseurl + '/admin/questionnaire_upd', questionnaire_upd);
app.use(baseurl + '/admin/resetall', resetall);
app.use(baseurl + '/admin/resetq', resetq);
app.use(baseurl + '/admin/getallquestionnaires', getallquestionnaires);

app.use(baseurl + '/questionnaire', questionnaire);
app.use(baseurl + '/question', question);
app.use(baseurl + '/doanswer', doanswer);
app.use(baseurl + '/getsessionanswers', getsessionanswers);
app.use(baseurl + '/getquestionanswers', getquestionanswers);
// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;