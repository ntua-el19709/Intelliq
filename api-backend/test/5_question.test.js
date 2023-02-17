const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionID = 1;
const valid_questionnaireID = 1;

const invalid_questionnaireID = 1;
const invalid_questionID = 1;

/*
describe('Test question api call to get question title with valid params (GET: {baseurl}/admin/question', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/question' + valid_questionnaireID + '/' + valid_questionID )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(404);
        })
    })
    it('Should return a json object', () => {
        expect(response).to.be.an('object');
    })
})

*/

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
