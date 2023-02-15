#!/usr/bin/env node

/**
 
 * @author mouchlis <->
 */

const commands = require("commander");
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const healthcheck = require('../src/healthcheck');
const resetall = require('../src/resetall');
const questionnaire_upd = require('../src/questionnaire_upd');
const questionnaire = require('../src/questionnaire');
const resetq = require('../src/resetq');
const question = require('../src/question');
const doanswer = require('../src/doanswer');
const getsessionanswers = require('../src/getsessionanswers');
const getquestionanswers = require('../src/getquestionanswers');

clear();

console.log(
	chalk.yellow(
		figlet.textSync('SoftEng22-25', { horizontalLayout: 'full' })
	)
);

commands.command('healthcheck')
.alias('hc')
.description('Confirms end-to-end connectivity between the user and the database')
.action( function(o) { healthcheck(o) } )

commands.command('resetall')
.alias('r')
.description('Resets database and sets default admin account')
.action( function(o) { resetall(o) } )

commands.command('questionnaire_upd')
.alias('qup')
.description('update questionnair')
.requiredOption('-src, --source [source]', 'Source')
.action( function(o) { questionnaire_upd(o) } )

commands.command('questionnaire')
.alias('q')
.description('takes questionnaire id and returns questionnaire info')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.option('-f, --format [format]', 'Content-type', 'json')
.action( function(o) { questionnaire(o) } )

commands.command('resetq')
.alias('rq')
.description('reset questionnair')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.action( function(o) { resetq(o) } )

commands.command('question')
.alias('qn')
.description('takes questionnaire id, question id and returns question info')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.requiredOption('-qnid, --question_id [question_id]', 'question_id')
.option('-f, --format [format]', 'Content-type', 'json')
.action( function(o) { question(o) } )

commands.command('doanswer')
.alias('da')
.description('takes questionnair id, question id, session id and lets you give an answer')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.requiredOption('-qn, --question_id [question_id]', 'question_id')
.requiredOption('-sid, --session_id [session_id]', 'session_id')
.requiredOption('-op, --option_id [option_id]', 'option_id')
.action( function(o) { doanswer(o) } )

commands.command('getsessionanswers')
.alias('gsa')
.description('takes questionnaire id, session id and returns all answers')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.requiredOption('-sid, --session_id [session_id]', 'session_id')
.option('-f, --format [format]', 'Content-type', 'json')
.action( function(o) { getsessionanswers(o) } )

commands.command('getquestionanswers')
.alias('gqa')
.description('takes questionnaire id, question id and returns all answers of the question')
.requiredOption('-qid, --questionnaire_id [questionnaire_id]', 'questionnaire_id')
.requiredOption('-qn, --question_id [question_id]', 'question_id')
.option('-f, --format [format]', 'Content-type', 'json')
.action( function(o) { getquestionanswers(o) } )

commands.parse(process.argv);
var scope = process.argv[2];
var scopeList = ['healthcheck', 'hc', 'resetall', 'r','questionnaire_upd', 'qup', 'questionnaire', 'q', 'resetq', 'rq','question','qn','getsessionanswer', 'gsa', 'getquestionanswers', 'gqa' ];

if (process.argv.length < 3) {
	console.log(process.argv.length < 3);
	console.log(chalk.red('Error occured! Scope was not specified!'));
	console.log(chalk.yellow('Choose one of the following:'));
	console.log(chalk.yellow('healthcheck          | hc'));
	console.log(chalk.yellow('resetall             | r'));
	console.log(chalk.yellow('questionnaire_upd    | qup'));
	console.log(chalk.yellow('questionnaire        | q'));
	console.log(chalk.yellow('resetq               | rq'));
	console.log(chalk.yellow('question             | qn'));
	console.log(chalk.yellow('doanswer             | da'));
	console.log(chalk.yellow('getsessionanswers    | gsa'));
	console.log(chalk.yellow('getquestionanswers   | gqa'));
}
else if (!scopeList.includes(scope)) {
	console.log(chalk.red('Error, this command does not exist!'));
	console.log(chalk.yellow('For more information, type --help'));
}