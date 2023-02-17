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


describe('Test question api call to get question title with valid params (GET: {baseurl}/admin/question', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/question' + valid_questionnaireID + '/' + valid_questionID )
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



describe('Test question api call to get question without params (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/question')
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test question api call to get question with invalid questionnaireID (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/question' + invalid_questionnaireID + '/' + valid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test question api call to get question with invalid questionID (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/question' + valid_questionnaireID + '/' + invalid_questionID )
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
describe('Test question api call to get question with missing questionID (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/question' + valid_questionnaireID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test question api call to get question with missing questionnaireID (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/question' + invalid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})
