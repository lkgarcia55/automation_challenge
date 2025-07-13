describe('Main navigation', () => {

  // Logs the start of the test suite
  it('Should log in successfully', () => {
    cy.task('logMessage', 'Main navigation');
  });

  // Visit the page before each test
  beforeEach(() => {
    cy.visit('/');
  });

  // ─────────────────────────────────────────────────────────────
  // REGISTER LINK
  // ─────────────────────────────────────────────────────────────

  // Verifies that the "Registrarse" link exists, is visible, navigates correctly,
  // and that the registration page loads with the correct title
  it('Main nav - Registrarse Link', () => {
    cy.contains('Registrarse')
      .should('exist')
      .should('have.attr', 'href')
      .should('include', '/auth/signup');

    cy.contains('Registrarse')
      .should('be.visible')
      .click()
      .url().should('include', '/auth/signup');

    cy.get('h1')
      .should('have.text', 'Crea un usuario nuevo')
      .should('be.visible');
  });

  // ─────────────────────────────────────────────────────────────
  // LOGIN LINK
  // ─────────────────────────────────────────────────────────────

  // Verifies that the "Acceder" link exists, is visible, navigates correctly,
  // and that the login page loads with the correct title
  it('Main nav - Acceder Link', () => {
    cy.contains('Acceder')
      .should('exist')
      .should('have.attr', 'href')
      .should('include', '/auth/login');

    cy.contains('Acceder')
      .should('be.visible')
      .click()
      .url().should('include', '/auth/login');

    cy.get('h1')
      .should('have.text', 'Inicia Sesión')
      .should('be.visible');
  });

});
