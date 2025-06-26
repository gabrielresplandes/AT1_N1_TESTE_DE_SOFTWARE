/// <reference types="cypress" />

describe('Login e Logout', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/') // Aplicação para testar
    })

    it('Deve realizar login com sucesso com usuário e senha corretos', () => { // Valida o login com usuário e senha corretos 
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html') // Verifica se a URL mudou para a página de inventário
        cy.get('.product_label').should('be.visible').and('contain', 'Products') // Valida a exibição da lista de produtos 
    })

    it('Deve exibir mensagem de erro com usuário e senha incorretos', () => { // Valida o comportamento com usuário e senha incorretos 
        cy.get('[data-test=username]').type('invalid_user')
        cy.get('[data-test=password]').type('wrong_password')
        cy.get('#login-button').click()
        cy.get('[data-test=error]').should('be.visible').and('contain', 'Username and password do not match any user in this service')
    })

    it('Deve realizar logout após login bem-sucedido', () => { // Realizar logout após login bem-sucedido 
        // Realiza o login
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')

        // Realiza o logout
        cy.get('.bm-burger-button').click() // Abre o menu lateral
        cy.get('#logout_sidebar_link').click() // Clica no botão de logout
        cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html') // Verifica se voltou para a página de login
        cy.get('#login-button').should('be.visible') // Verifica se o botão de login está visível
    })
})