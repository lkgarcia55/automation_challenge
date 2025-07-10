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

    cy.get('span.px-4.py-2')
      .should('be.visible')
      .invoke('text')
      .then((cantidadAntes) => {
        const cantidadInicial = parseInt(cantidadAntes.trim());

        // ✅ Click the button to increase the quantity
        cy.get('[data-at="increment-quantity"]').click();

        // ✅ Check that the quantity has increased by 1
        cy.get('span.px-4.py-2').invoke('text').then((cantidadDespues) => {
          const cantidadFinal = parseInt(cantidadDespues.trim());
          expect(cantidadFinal).to.eq(cantidadInicial + 1);
        });
      });

    cy.get('[data-at="add-to-cart"]')
      .should('have.text', 'Añadir al carrito')
      .should('be.visible')
      .click();

    cy.get('[data-at="cart-opener"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.get('.z-20 > .h-full')
      .should('be.visible')
      .contains('Mancuernas Recubiertas de Neopreno');

    cy.get('.z-20 > .h-full')
      .should('be.visible')
      .contains('2');

    cy.get('.bg-primaryColor')
      .should('have.text', 'Ir al checkout')
      .should('be.visible')
      .click();
  });

});
