const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionnaireID = 1;
const valid_sessionID = 1;

const invalid_questionnaireID = 1;
const invalid_sessionID = 1;

/*
describe('Test getsessionanswers api call with valid params (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + valid_questionnaireID + '/' + valid_sessionID )
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

describe('Test getsessionanswers api call without params(GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers')
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getsessionanswers api call with invalid questionnaireID (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + invalid_questionnaireID + '/' + valid_sessionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getsessionanswers api call with invalid session_ID (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + valid_questionnaireID + '/' + invalid_sessionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})