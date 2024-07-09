describe('My First Test', () => {
  beforeEach(() => {
    // Intercept and mock the API responses
    cy.intercept('GET', 'https://dummyjson.com/users', {
      statusCode: 200,
      body: {
        users: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Doe' },
          // Add more mock users as needed
        ]
      }
    }).as('getUsers')

    cy.intercept('GET', 'https://dummyjson.com/products', {
      statusCode: 200,
      body: {
        products: [
          { title: 'Product 1', description: 'Description 1' },
          { title: 'Product 2', description: 'Description 2' },
          // Add more mock products as needed
        ]
      }
    }).as('getProducts')
  })

  it('Navigate to about page', () => {
    // Visit the home page
    cy.visit('/')

    // Wait for the API calls to complete
    cy.wait('@getUsers')
    cy.wait('@getProducts')

    // Check if the mock data is rendered properly
    cy.contains('John Doe').should('exist')
    cy.contains('Jane Doe').should('exist')
    cy.contains('Product 1 : Description 1').should('exist')
    cy.contains('Product 2 : Description 2').should('exist')

    // Perform navigation to the about page
    cy.get('[data-test="about-button"]').click()
   
    // Verify about page functionality
    cy.contains(/initial-state/i).should('exist')
    cy.get('[data-test="change-button"]').click()
    cy.contains(/changed-state/i).should('exist')
    cy.get('[data-test="reset-button"]').click()
    cy.contains(/initial-state/i).should('exist')
    cy.get('[data-test="home-button"]').click()
  })
})

