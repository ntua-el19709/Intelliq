const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionID = 1;
const valid_questionnaireID = 1;
const valid_sessionID = 1;

const invalid_questionnaireID = 1;
const invalid_questionID = 1;
const invalid_sessionID = 1;

/*
describe('Test getquestionanswers api call with valid params (GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID + '/' + valid_questionID + '/' + valid_sessionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(200);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

*/

describe('Test getquestionanswers api call without params(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers')
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})


describe('Test getquestionanswers api call with invalid questionnaireID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + invalid_questionnaireID + '/' + valid_sessionID + '/' + valid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getquestionanswers api call with invalid sessionID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID + '/' + invalid_sessionID + '/' + valid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getquestionanswers api call with invalid questionID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID + '/' + valid_sessionID + '/' + invalid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})