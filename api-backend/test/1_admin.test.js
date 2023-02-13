const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
var fs = require('fs');

/* Test admin route healthcheck */
describe('Test admin healthcheck (GET: {baseurl}/admin/healthcheck', () => {
    it('Should return with status 200', () => {
        request(app)
        .get('/intelliq_api/admin/healthcheck')
        .end((err, res) => {
            expect(res.status).to.eq(200);
        })
    })
})