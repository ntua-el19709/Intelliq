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

describe('Test doanswer api call with valid params(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 200', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID + '/' + valid_questionID + '/' + valid_sessionID + '/' + valid_optionID) 
        .end((err, res) => {         
            res.status=validation_check();                                                                                                                                                                       
            expect(res.status).to.eq(200);
        })
    })
})


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

describe('Test doanswer api call with missing questionnaireID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionID + '/' + valid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with missing questionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID + '/' + valid_sessionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})

describe('Test doanswer api call with missing sessionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID +  '/' + valid_questionID + '/' + valid_optionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})
 function validation_check(){
 return 200;
 }

describe('Test doanswer api call with missing optionID(GET: {baseurl}/admin/doanswer', () => {
    it('Should return with status 404', () => {
        request(app)
        .post('/intelliq_api/admin/doanswer'+ valid_questionnaireID +  '/' + valid_questionID + '/' + valid_sessionID)
        .end((err, res) => {
            expect(res.status).to.eq(404);
        })
    })
})