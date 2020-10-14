"use strict";
describe('Loading express', function () {
    var socket = io();
    beforeEach(function () {
        it('Succesfully loads', function () {
            cy.visit('/');
        });
    });
    it('Get back 200 from express server', function () {
        cy.request('/').then(function (response) {
            expect(response.status).to.eq(200);
        });
    });
});
