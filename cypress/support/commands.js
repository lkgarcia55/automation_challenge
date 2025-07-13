// Custom command to add a product to the cart
Cypress.Commands.add('addProductToCart', () => {
  // Get the initial quantity
  cy.get('span.px-4.py-2')
    .should('be.visible')
    .invoke('text')
    .then((cantidadAntes) => {
      const cantidadInicial = parseInt(cantidadAntes.trim());

      // Click the increment button twice
      cy.get('[data-at="increment-quantity"]').click().click();

      // Verify that the quantity increased by 2
      cy.get('span.px-4.py-2')
        .invoke('text')
        .then((cantidadDespues) => {
          const cantidadFinal = parseInt(cantidadDespues.trim());
          expect(cantidadFinal).to.eq(cantidadInicial + 2);
        });
    });

  // Decrease the quantity by 1 and verify
  cy.get('span.px-4.py-2')
    .invoke('text')
    .then((cantidadAntes) => {
      const cantidadInicial = parseInt(cantidadAntes.trim());

      cy.get('[data-at="decrement-quantity"]').click();

      cy.get('span.px-4.py-2')
        .invoke('text')
        .then((cantidadDespues) => {
          const cantidadFinal = parseInt(cantidadDespues.trim());
          expect(cantidadFinal).to.eq(cantidadInicial - 1);
        });
    });

  // Click the "Add to cart" button
  cy.get('[data-at="add-to-cart"]')
    .should('have.text', 'Añadir al carrito')
    .should('be.visible')
    .click();

  // Validate "Added to Cart" notification validation  
  cy.get('.ant-notification-notice')
    .should('be.visible');

  cy.get('.ant-notification-notice-message')
    .should('have.text', 'Agregado al carrito')
    .should('be.visible');

  // Open the cart
  cy.get('[data-at="cart-opener"]')
    .should('exist')
    .should('be.visible')
    .click();

  // Check that the product is in the cart
  cy.get('.z-20 > .h-full')
    .should('be.visible')
    .contains('Mancuernas Recubiertas de Neopreno');

  // Check that the quantity is 2
  cy.get('.z-20 > .h-full')
    .should('be.visible')
    .contains('2');
    
// Custom command to verify that total price in cart is correct
    Cypress.Commands.add('verifyCartTotalPrice', () => {
    let unitPrice = 0;
    let quantity = 0;
    let expectedTotal = 0;

    // Get the unit price (e.g. $800.00)
    cy.get('.text-2xl')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
        unitPrice = parseFloat(text.replace(/[^0-9.]/g, '')) * 100; // $800.00 → 80000
        });

    // Get the current quantity
    cy.get('span.px-4.py-2')
        .invoke('text')
        .then((text) => {
        quantity = parseInt(text.trim());
        expectedTotal = unitPrice * quantity;

        // Get the total price displayed in the cart and compare
        cy.get('[data-at="total-price"]')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
            const totalUI = parseFloat(text.replace(/[^0-9.]/g, '')) * 100;
            expect(totalUI).to.eq(expectedTotal);
            });
        }); 
    });
      
});

// Custom command to log in using fixture data
Cypress.Commands.add('loginWithFixture', (fixtureFile) => {
  cy.fixture(fixtureFile).then((user) => {
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    cy.get('[data-at="submit-login"]')
      .should('have.text', 'Iniciar Sesión')
      .should('be.visible')
      .click();

    cy.url().should('include', '/');
  });
});

















