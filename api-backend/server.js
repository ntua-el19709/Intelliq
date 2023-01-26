const express = require('express')
const app = express()

const chalk = require("chalk")

const indexRouter = require('./routes/index')

// INSTALL AND UNCOMMENT IF TEMPLATES/LAYOUTS ARE NEEDED
// const expressLayouts = require('express-ejs-layouts')
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

const port = process.env.PORT || 9103;
const baseurl = '/intelliq_api'

// TODO: add support for https

app.listen(port, () => {
    console.log(chalk.green(`🚀 Server running at: http://localhost:${port}${baseurl}`));
});

const healthcheck = require('./api/admin/healthcheck')

app.use(baseurl + '/admin/healthcheck', healthcheck)

