/// <reference types="cypress" />
import ApiHelper from "../apiHelper";

describe('Petstore API Tests', () => {
    const apiHelper = new ApiHelper();
    const apiUrl = 'https://petstore.swagger.io/v2';

    it('POST - Create an order', () => {
        cy.request({
            method: 'POST',
            url: apiUrl+'/store/order',
            headers: apiHelper.header(),
            body: apiHelper.orderData("29","29","29")
        }).then((response) => {
            expect(response.status).to.eq(200); // successful 
        });
    });

    it('GET - Get an order', () => {
        const id = 29;
        cy.request({
            method: 'GET',
            url: apiUrl+'/store/order/'+id,
            headers: apiHelper.header(),
        }).then((response) => {
            expect(response.status).to.eq(200); // successful 
        });
    });

    it('GET - Get Undifined Id', () => {
        const id = 3000;
        cy.request({
            method: 'GET',
            url: apiUrl+'/store/order/'+id,
            headers: apiHelper.header(),
            failOnStatusCode: false // Hata Durumunda Testi Başarısız Olarak Görmemek İçin Eklenmiştir. 
        }).then((response) => {
            expect(response.status).to.eq(404); // Durum Kodu 404 dönmektedir
        });
    });

    it('DELETE - Delete Order Id', () => {
        const deleteId = 29;
        cy.request({
            method: 'DELETE',
            url: apiUrl+'/store/order/'+deleteId,
            headers: apiHelper.header()
        }).then((response) => {
            expect(response.status).to.eq(200); // successful 
        });
    });

    it('DELETE - Delete Undifined Order Id', () => {
        const deleteId = 354;
        cy.request({
            method: 'DELETE',
            url: apiUrl+'/store/order/'+deleteId,
            headers: apiHelper.header(),
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404); // Order not found
        });
    });


    
});