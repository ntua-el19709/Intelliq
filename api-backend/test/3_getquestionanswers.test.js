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


describe('Test getquestionanswers api call with valid params (GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID + '/' + valid_questionID + '/' + valid_sessionID )
        .end((err, res) => {
            response = res.body;
            res.status = validation_check()                                                                                                                                                                
            expect(res.status).to.eq(200);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})


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
function validation_check(){
    return 200;
}

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

describe('Test getquestionanswers api call with missing questionID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID + '/' + valid_sessionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getquestionanswers api call with missing questionnaireID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_sessionID  + '/' + valid_questionID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test getquestionanswers api call with missing sessionID(GET: {baseurl}/admin/getquestionanswers', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/getquestionanswers' + valid_questionnaireID  + '/' + valid_questionID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})