const express = require("express");
const app = express();

const chalk = require("chalk");

// INSTALL AND UNCOMMENT IF TEMPLATES/LAYOUTS ARE NEEDED
// const expressLayouts = require('express-ejs-layouts')
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static("public"));

const port = process.env.PORT || 9103;
const baseurl = "/intelliq_api";

// TODO: add support for https

app.listen(port, () => {
  console.log(
    chalk.green(`🚀 Server running at: http://localhost:${port}${baseurl}`)
  );
});

const healthcheck = require("./api/admin/healthcheck"),
  questionnaire_upd = require("./api/admin/questionnaire_upd"),
  resetall = require("./api/admin/resetall");

const questionnaire = require("./api/questionnaire"),
  question = require("./api/question"),
  doanswer = require("./api/doanswer"),
  getquestionanswers = require("./api/getquestionanswers");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(baseurl + "/admin/healthcheck", healthcheck);
app.use(baseurl + "/admin/questionnaire_upd", questionnaire_upd);
app.use(baseurl + "/admin/resetall", resetall);

app.use(baseurl + "/doanswer", doanswer);
app.use(baseurl + "/question", question);
app.use(baseurl + "/questionnaire", questionnaire);
app.use(baseurl + "/getquestionanswers", getquestionanswers);
