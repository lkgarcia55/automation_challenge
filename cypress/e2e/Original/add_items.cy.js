describe('Add items to the card', () => {

  it('Should log in successfully', () => {
    cy.task('logMessage', 'Add items to the card');
  });

  // ✅ Before each test, visit homepage
  beforeEach(() => {
    cy.visit('/');
  });

  // -------------------- CATEGORY VALIDATION --------------------

  // Verifies that the "Aire Libre" category title is displayed correctly
  it('Found Category - Aire Libre', () => {
    cy.get('.bg-green-800 > div > .text-xl')
      .should('have.text', 'Aire Libre')
      .should('be.visible');
  });

  // -------------------- NAVIGATION LINK --------------------

  // Verifies that the "COMPRAR" link is present and points to the correct section
  it('Found Link - Comprar', () => {
    cy.contains('COMPRAR')
      .should('be.visible')
      .should('have.attr', 'href')
      .should('include', '#outsiders');
  });

  // Clicks the "COMPRAR" link and verifies navigation
  it('Click Link - Comprar', () => {
    cy.get('a[href="#outsiders"]')
      .click()
      .url().should('include', '#outsiders');
  });

  // -------------------- SECTION DISPLAY --------------------

  // Validates the "Aire Libre" section title
  it('Found Section - Aire Libre', () => {
    cy.get('#outsiders > .text-3xl')
      .should('be.visible')
      .should('have.text', 'Aire Libre');
  });

  // -------------------- PRODUCT CARD --------------------

  // Verifies the presence of the "Mancuernas Recubiertas de Neopreno" product link
  it('Found element - Mancuernas Recubiertas de Neopreno', () => {
    cy.get('a[data-at="product-card"]')
      .eq(2)
      .should('have.attr', 'href')
      .should('include', '/products/mancuernas-recubiertas-de-neopreno');
  });

  // -------------------- PRODUCT FLOW --------------------

  // Clicks the product, increases quantity, adds to cart, verifies cart and proceeds to checkout
  it('Click on the element & add to the card ', () => {
    cy.get('a[data-at="product-card"]')
      .eq(2)
      .contains('Mancuernas Recubiertas de Neopreno')
      .should('be.visible')
      .click();

    cy.get('h1')
      .should('have.text', 'Mancuernas Recubiertas de Neopreno')
      .should('be.visible');

    cy.get('.text-2xl')
      .should('have.text', '$800.00')
      .should('be.visible');  

    cy.addProductToCart();

    cy.get('[data-at="empty-cart"]')
      .should('have.text', 'Limpiar')
      .should('be.visible')
      .click();

    cy.get('.text-center.text-gray-600')
      .should('be.visible')
      .should('have.text', 'No tienes elementos en el carrito');

    cy.get('.z-20 > .h-full > .duration-200')
      .should('be.visible')
      .click();
    
    cy.addProductToCart();

    cy.get('.bg-primaryColor')
      .should('have.text', 'Ir al checkout')
      .should('be.visible')
      .click();

    cy.loginWithFixture('registered_user');  
  });

});
