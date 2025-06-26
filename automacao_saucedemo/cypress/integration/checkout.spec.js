/// <reference types="cypress" />

describe('Checkout', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/') // Aplicação: https://www.saucedemo.com/v1/
        // Login prévio
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html') // Validar a exibição da lista de produtos após login

        // Adicionar o PRIMEIRO produto ao carrinho
        cy.get('.btn_primary').first().should('be.visible').click()

        // Vai para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html') // Certifica-se que está na página do carrinho
        cy.get('.cart_list').should('be.visible') // Espera que a lista de itens do carrinho esteja visível

        // **** ALTERAÇÃO AQUI NO beforeEach ****
        // Apenas verifica se o link 'CHECKOUT' está visível.
        // A asserção '.and('be.enabled')' foi removida, pois links não usam 'disabled'
        cy.contains('CHECKOUT').should('be.visible') // Garante que o link "CHECKOUT" esteja visível
    })

    it('Deve iniciar o processo de checkout e preencher dados obrigatórios', () => {
        // Clica no link "CHECKOUT".
        cy.contains('CHECKOUT').click()
        cy.url().should('include', '/checkout-step-one.html')

        cy.get('[data-test=firstName]').type('João')
        cy.get('[data-test=lastName]').type('Silva')
        cy.get('[data-test=postalCode]').type('12345-678')
        cy.get('.btn_primary').contains('CONTINUE').click()
        cy.url().should('include', '/checkout-step-two.html')
    })

    it('Deve validar o resumo da compra', () => {
        // Clica no link "CHECKOUT".
        cy.contains('CHECKOUT').click()
        cy.url().should('include', '/checkout-step-one.html')

        cy.get('[data-test=firstName]').type('João')
        cy.get('[data-test=lastName]').type('Silva')
        cy.get('[data-test=postalCode]').type('12345-678')
        cy.get('.btn_primary').contains('CONTINUE').click()
        cy.url().should('include', '/checkout-step-two.html')

        cy.get('.summary_info').should('be.visible')
        cy.get('.summary_subtotal_label').should('be.visible')
        cy.get('.summary_tax_label').should('be.visible')
        cy.get('.summary_total_label').should('be.visible')
        cy.get('.cart_list').should('have.length.greaterThan', 0)
    })

    it('Deve finalizar a compra e validar mensagem de sucesso', () => {
        // Clica no link "CHECKOUT".
        cy.contains('CHECKOUT').click()
        cy.url().should('include', '/checkout-step-one.html')

        cy.get('[data-test=firstName]').type('João')
        cy.get('[data-test=lastName]').type('Silva')
        cy.get('[data-test=postalCode]').type('12345-678')
        cy.get('.btn_primary').contains('CONTINUE').click()
        cy.url().should('include', '/checkout-step-two.html')

        cy.get('.btn_action').contains('FINISH').click()
        cy.url().should('include', '/checkout-complete.html')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')
        cy.get('.pony_express').should('be.visible')
    })
})