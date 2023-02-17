const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionnaireID = 1;

const invalid_questionnaireID = 1;


/*
describe('Test questionnaire api call to get questionnaire title with valid params (GET: {baseurl}/admin/questionnaire', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/questionnaire' + valid_questionnaireID )
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

describe('Test questionnaire api call to get questionnaire with invalid_questionnaireID (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/questionnaire'+ invalid_questionnaireID)
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

describe('Test questionnaire api call to get questionnaire without params (GET: {baseurl}/admin/question', () => {
    it('Should return with status 404', () => {
        request(app)
        .get('/intelliq_api/admin/questionnaire')
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})