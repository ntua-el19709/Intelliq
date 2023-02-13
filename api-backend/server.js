const express = require('express');
const app = require('./app');

const chalk = require("chalk");

// INSTALL AND UNCOMMENT IF TEMPLATES/LAYOUTS ARE NEEDED
// const expressLayouts = require('express-ejs-layouts')
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public'));

const port = process.env.PORT || 9103;
const baseurl = '/intelliq_api';

// TODO: add support for https

app.listen(port, () => {
    console.log(chalk.green(`🚀 Server running at: http://localhost:${port}${baseurl}`));
});