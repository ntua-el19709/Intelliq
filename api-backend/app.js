const express = require('express');
const bodyParser = require('body-parser');

/* ROUTES and how to import routes */
const healthcheck = require('./api/admin/healthcheck');
const questionnaire_upd = require('./api/admin/questionnaire_upd');
const resetall = require('./api/admin/resetall');

const questionnaire = require('./api/questionnaire');
const question = require('./api/question');
const doanswer = require('./api/doanswer');
/* end of ROUTES and how to import routes */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-OBSERVATORY-AUTH");
    next();
});

// /* Routes used by our project */

app.use('/intelliq_api/admin/healthcheck', healthcheck);
app.use('/intelliq_api/admin/questionnaire_upd', questionnaire_upd);
app.use('/intelliq_api/admin/resetall', resetall);

app.use('/intelliq_api/doanswer', doanswer);
app.use('/intelliq_api/question', question);
app.use('/intelliq_api/questionnaire', questionnaire);

// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;