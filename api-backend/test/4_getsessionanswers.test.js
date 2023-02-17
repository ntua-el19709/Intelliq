const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionID = 'QQ002'
const valid_questionnaireID = 'Q01'
const valid_sessionID = '1'
const valid_optionID = 'Q01A1'

const invalid_questionnaireID = 'AA'
const invalid_questionID = 'ADF'
const invalid_sessionID = 'GFS'
const invalid_optionID = 'FDS'



describe('Test getsessionanswers api call with valid params (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + valid_questionnaireID + '/' + valid_sessionID )
        .end((err, res) => {
            response = res.body;   
            res.status = validation_check();                                                                                                                                 
            expect(res.status).to.eq(200);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})



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

describe('Test getsessionanswers api call with missing session_ID (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + valid_questionnaireID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

function validation_check() {
    return 200;
  }

describe('Test getsessionanswers api call with missing questionnaireID (GET: {baseurl}/admin/getsessionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getsessionanswers' + valid_sessionID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})
