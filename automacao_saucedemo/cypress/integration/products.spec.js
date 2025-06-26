/// <reference types="cypress" />

describe('Produtos', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/')
        // Login prévio
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve exibir a lista de produtos após o login', () => { // Validar a exibição da lista de produtos - Após login 
        cy.get('.product_label').should('be.visible').and('contain', 'Products')
        cy.get('.inventory_item').should('have.length.greaterThan', 0) // Verifica se há itens na lista
    })

    it('Deve visualizar os detalhes de um produto', () => { // Visualizar detalhes
        cy.get('.inventory_item_name').first().click() // Clica no primeiro produto da lista
        cy.url().should('include', '/inventory-item.html?id=') // Verifica se a URL mudou para a página de detalhes do produto
        cy.get('.inventory_details_name').should('be.visible') // Verifica se o nome do produto está visível nos detalhes
        cy.get('.inventory_details_desc').should('be.visible') // Verifica se a descrição do produto está visível
        cy.get('.inventory_details_price').should('be.visible') // Verifica se o preço do produto está visível
    })

    it('Deve ordenar produtos por nome (A a Z)', () => { // Ordena produtos
        cy.get('.product_sort_container').select('az')
        // Captura os nomes dos produtos e verifica se estão em ordem alfabética
        cy.get('.inventory_item_name').then($names => {
            const productNames = Cypress.$.makeArray($names).map(el => el.innerText)
            const sortedNames = [...productNames].sort()
            expect(productNames).to.deep.equal(sortedNames)
        })
    })

    it('Deve ordenar produtos por nome (Z a A)', () => { // Ordena produtos
        cy.get('.product_sort_container').select('za')
        cy.get('.inventory_item_name').then($names => {
            const productNames = Cypress.$.makeArray($names).map(el => el.innerText)
            const sortedNames = [...productNames].sort().reverse()
            expect(productNames).to.deep.equal(sortedNames)
        })
    })

    it('Deve ordenar produtos por preço (Low to High)', () => { // Ordena produtos 
        cy.get('.product_sort_container').select('lohi')
        cy.get('.inventory_item_price').then($prices => {
            const productPrices = Cypress.$.makeArray($prices).map(el => parseFloat(el.innerText.replace('$', '')))
            const sortedPrices = [...productPrices].sort((a, b) => a - b)
            expect(productPrices).to.deep.equal(sortedPrices)
        })
    })

    it('Deve ordenar produtos por preço (High to Low)', () => { // Ordena produtos
        cy.get('.product_sort_container').select('hilo')
        cy.get('.inventory_item_price').then($prices => {
            const productPrices = Cypress.$.makeArray($prices).map(el => parseFloat(el.innerText.replace('$', '')))
            const sortedPrices = [...productPrices].sort((a, b) => b - a)
            expect(productPrices).to.deep.equal(sortedPrices)
        })
    })
})