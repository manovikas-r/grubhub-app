var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Grubhub", function () {
    describe('Login Test', function () {

        it('Incorrect Password', function () {
            agent.post("/grubhub/login")
                .send({ email_id: "charan@sjsu.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("INCORRECT_PASSWORD");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Invalid User', function () {
            agent.post("/grubhub/login")
                .send({ email_id: "user@sjsu.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("NO_USER");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Owner Signup Test', function () {

        it('Owner Already Exists', function () {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "owner@sjsu.edu", password: "password", res_zip_code: "23342", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.text).to.equal("USER_EXISTS");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

});