describe('Main navigation', () => {

  // ✅ Before each test, visit the homepage

  beforeEach(() => {
    cy.visit('/')
  })

  it('Main nav - Registrarse Link', () => {
    cy.contains('Registrarse')
    .should('exist')
    .should('have.attr', 'href')
    .should('include', '/auth/signup');

    cy.contains('Registrarse')
    .should('be.visible')
    .click()
    .url().should('include','/auth/signup')

    cy.get('h1')
    .should('have.text','Crea un usuario nuevo')
    .should('be.visible');
  })

  it('Main nav - Acceder Link', () => {
    cy.contains('Acceder')
    .should('exist')
    .should('have.attr', 'href')
    .should('include', '/auth/login');

    cy.contains('Acceder')
    .should('be.visible')
    .click()
    .url().should('include','/auth/login');

    cy.get('h1')
    .should('have.text','Inicia Sesión')
    .should('be.visible');

   });
  
})