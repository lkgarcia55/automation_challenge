describe('Full flow - User who adds items to the cart, logs in and completes purchase', () => {

  // Log initial message
  it('Should log in successfully', () => {
    cy.task('logMessage', 'Add items to the cart');
  });

  // ✅ Navigate to page before each test
  beforeEach(() => {
    cy.visit('/');
  });

  // ─────────────────────────────────────────────────────────────
  // CATEGORY VALIDATION
  // ─────────────────────────────────────────────────────────────

  // Validates that the "Aire Libre" category title is displayed
  it('Found Category - Aire Libre', () => {
    cy.get('.bg-green-800 > div > .text-xl')
      .should('have.text', 'Aire Libre')
      .should('be.visible');
  });

  // ─────────────────────────────────────────────────────────────
  // NAVIGATION LINK
  // ─────────────────────────────────────────────────────────────

  // Checks the "COMPRAR" link exists and has correct target
  it('Found Link - Comprar', () => {
    cy.contains('COMPRAR')
      .should('be.visible')
      .should('have.attr', 'href')
      .should('include', '#outsiders');
  });

  // Clicks "COMPRAR" and verifies scroll/anchor behavior
  it('Click Link - Comprar', () => {
    cy.get('a[href="#outsiders"]')
      .click()
      .url().should('include', '#outsiders');
  });

  // ─────────────────────────────────────────────────────────────
  // SECTION DISPLAY
  // ─────────────────────────────────────────────────────────────

  // Verifies that the "Aire Libre" section is displayed
  it('Found Section - Aire Libre', () => {
    cy.get('#outsiders > .text-3xl')
      .should('be.visible')
      .should('have.text', 'Aire Libre');
  });

  // ─────────────────────────────────────────────────────────────
  // PRODUCT CARD VALIDATION
  // ─────────────────────────────────────────────────────────────

  // Ensures the product card for "Mancuernas Recubiertas de Neopreno" exists
  it('Found element - Mancuernas Recubiertas de Neopreno', () => {
    cy.get('a[data-at="product-card"]')
      .eq(2)
      .should('have.attr', 'href')
      .should('include', '/products/mancuernas-recubiertas-de-neopreno');
  });

  // ─────────────────────────────────────────────────────────────
  // PRODUCT FLOW: ADD, VALIDATE, EMPTY
  // ─────────────────────────────────────────────────────────────

  // Adds product to cart, validates quantity, empties cart
  it('Click on the element & add to the cart', () => {
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
    cy.verifyCartTotalPrice();

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
  });

  // ─────────────────────────────────────────────────────────────
  // PRODUCT FLOW + CHECKOUT + ORDER CONFIRMATION
  // ─────────────────────────────────────────────────────────────

  // Completes full checkout process and verifies confirmation screen
  it('Click on the element & add to the cart & checkout', () => {
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
    cy.verifyCartTotalPrice();

    cy.get('.bg-primaryColor')
      .should('have.text', 'Ir al checkout')
      .should('be.visible')
      .click();

    cy.loginWithFixture('registered_user');

    cy.get('[data-at="cart-opener"]')
      .should('be.visible')
      .click();

    cy.contains('button', 'Ir al checkout')
      .should('be.visible')
      .click();

    cy.fillCheckoutFormWithUser1();

    cy.get('.my-5 > .bg-primaryColor')
      .should('have.text', 'Completar Pago')
      .should('be.visible')
      .click();

    cy.get('h2')
      .should('have.text', 'Orden creada')
      .should('be.visible');

    cy.get('.swal2-html-container')
      .should('have.text', 'Tu orden se ha creado con éxito, podrás ver tu historial en tu cuenta')
      .should('be.visible');

    cy.get('.swal2-confirm')
      .should('have.text', 'Ir a mi cuenta')
      .should('be.visible')
      .click();

    cy.url().should('include', '/my-account');

    cy.get('h1')
      .should('have.text', 'Mi cuenta')
      .should('be.visible');

    cy.get('p.text-lg.font-bold.text-center.mt-4')
      .should('have.text', 'Juan David Contreras García')
      .should('be.visible');
  });

});
