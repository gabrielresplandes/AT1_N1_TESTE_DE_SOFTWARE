/// <reference types="cypress" />

describe('Carrinho', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/')
        // Login prévio
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')

        // Adiciona um produto ao carrinho em cada beforeEach para garantir um estado limpo
        cy.get('.btn_primary').first().click() // Adiciona o primeiro produto genérico
        cy.get('.shopping_cart_badge').should('contain', '1')
    })

    it('Deve adicionar produtos ao carrinho', () => { // Adicionar produtos ao carrinho 
        // O beforeEach já adicionou um produto. Vamos adicionar mais um para este teste.
        cy.get('.btn_primary').eq(1).click() // Adiciona o segundo produto na lista
        cy.get('.shopping_cart_badge').should('contain', '2') // Verifica se o contador do carrinho é 2
    })

    it('Deve remover produtos do carrinho', () => { // Remover produtos do carrinho 
        // O beforeEach já adicionou um produto, então o carrinho tem 1 item.

        // Vai para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Novo seletor: Procura pelo primeiro item do carrinho e, dentro dele, o botão de remover.
        cy.get('.cart_item').first().find('.btn_secondary').click() // Clica no botão "Remove" do primeiro item no carrinho

        cy.get('.shopping_cart_badge').should('not.exist') // Verifica se o contador sumiu
        cy.get('.cart_item').should('not.exist') // Verifica se o item foi removido do carrinho
    })

    it('Deve validar se os itens adicionados estão corretos no carrinho', () => { // Validar itens adicionados estão corretos 
        const product1Name = 'Sauce Labs Backpack' // O item que foi adicionado no beforeEach

        // Adiciona outro produto para este teste
        const product2Name = 'Sauce Labs Bike Light'
        cy.get('.inventory_item_name').contains(product2Name).parents('.inventory_item').find('.btn_primary').click()

        cy.get('.shopping_cart_badge').should('contain', '2')
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Valida se os nomes dos produtos adicionados estão presentes no carrinho
        cy.get('.cart_item_label').should('contain', product1Name)
        cy.get('.cart_item_label').should('contain', product2Name)
    })
})