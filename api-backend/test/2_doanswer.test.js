const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

const valid_questionID = 'QQ001'
const valid_questionnaireID = 'QQ01'
const valid_sessionID = 'QQQ1'
const valid_optionID = 'Q000'

const invalid_questionnaireID = 'AA'
const invalid_questionID = 'ADF'
const invalid_sessionID = 'GFS'
const invalid_optionID = 'FDS'
/*
describe('Test doanswer api call with valid params(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 200', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID + '/' + valid_questionID + '/' + valid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(200);
        })
    })
})
*/

describe('Test doanswer api call without params(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer')
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with invalid questionnaireID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ invalid_questionnaireID +  '/' + valid_questionID + '/' + valid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with invalid questionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID +  '/' + invalid_questionID + '/' + valid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with invalid sessionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID +  '/' + valid_questionID + '/' + invalid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with invalid optionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID +  '/' + valid_questionID + '/' + valid_sessionID + '/' + invalid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})
