/// <reference types="cypress" />
import ApiHelper from "../apiHelper";

describe('Pet API Tests', () => {
    const apiHelper = new ApiHelper();
    const apiUrl = 'https://petstore.swagger.io/v2';

    it('POST - Create Pet To Store', () => {
        cy.request({
            method: 'POST',
            url: apiUrl+'/pet',
            headers: apiHelper.header(),
            body: apiHelper.petData("23","DemoPetName","available")
        }).then((response) => {
            expect(response.status).to.eq(200); // successful operation
        });
    });   

    it('GET - Find Pet ID', () => {
        const petId = "23"
        cy.request({
            method: 'GET',
            url: apiUrl+'/pet/'+petId,
            headers: apiHelper.header(),
        }).then((response) => {
            expect(response.status).to.eq(200); // successful 
        });
    });   

    it('GET - Undifined Pet ID', () => {
        const petId = "2341423421342342423"
        cy.request({
            method: 'GET',
            url: apiUrl+'/pet/'+petId,
            headers: apiHelper.header(),
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404); // Pet not found
        });
    });   
    
    it('PUT - Update Pet Info', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl+'/pet',
            headers: apiHelper.header(),
            body: apiHelper.petData("23","DemoPetName2","available")
        }).then((response) => {
            expect(response.status).to.eq(200); // successful 
        });
    });  

    it('DELETE - Delete Pet', () => {
        const petId = "23"
        cy.request({
            method: 'DELETE',
            url: apiUrl+'/pet/'+petId,
            headers: apiHelper.header(),
        }).then((response) => {
            expect(response.status).to.eq(200);  // successful 
        });
    });   

});