// ───────────────────────────────────────────────────────────────
// Custom command: Add a product to the cart
// Increases quantity, adds product, verifies it in the cart
// ───────────────────────────────────────────────────────────────
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

  // Validate the "Added to Cart" notification
  cy.get('.ant-notification-notice').should('be.visible');
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
});


// ───────────────────────────────────────────────────────────────
// Custom command: Verify total price in cart is correct
// Based on unit price and selected quantity
// ───────────────────────────────────────────────────────────────
Cypress.Commands.add('verifyCartTotalPrice', () => {
  let unitPrice = 0;
  let quantity = 0;
  let expectedTotal = 0;

  // Get the unit price from the product detail (e.g. $800.00)
  cy.get('.text-2xl')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      unitPrice = parseFloat(text.replace(/[^0-9.]/g, '')) * 100;
    });

  // Get quantity from the product page
  cy.get('span.px-4.py-2')
    .invoke('text')
    .then((text) => {
      quantity = parseInt(text.trim());
      expectedTotal = unitPrice * quantity;

      // Get the total price displayed in the cart and compare
      cy.get('.cart-items .cart-grid')
        .find('.text-black')
        .eq(2)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          const totalUI = parseFloat(text.replace(/[^0-9.]/g, '')) * 100;
          expect(totalUI).to.eq(expectedTotal);
        });
    });
});


// ───────────────────────────────────────────────────────────────
// Custom command: Log in using fixture data
// Logs in a user from a fixture file
// ───────────────────────────────────────────────────────────────
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


// ───────────────────────────────────────────────────────────────
// Custom command: Add "Bandas Elásticas de Resistencia" to cart
// Handles product selection, quantity update, cart validation
// ───────────────────────────────────────────────────────────────
Cypress.Commands.add('addBandasElasticasToCart', () => {
  // Click the product card
  cy.get('a[data-at="product-card"]')
    .eq(0)
    .contains('Bandas Elásticas de Resistencia')
    .should('be.visible')
    .click();

  // Validate product detail page
  cy.get('h1')
    .should('have.text', 'Bandas Elásticas de Resistencia')
    .should('be.visible');

  cy.get('.text-2xl')
    .should('have.text', '$350.00')
    .should('be.visible');  

  // Get initial quantity and increase it
  cy.get('span.px-4.py-2')
    .should('be.visible')
    .invoke('text')
    .then((cantidadAntes) => {
      const cantidadInicial = parseInt(cantidadAntes.trim());

      // Increase quantity by 2
      cy.get('[data-at="increment-quantity"]').click();

      // Verify quantity increased
      cy.get('span.px-4.py-2')
        .invoke('text')
        .then((cantidadDespues) => {
          const cantidadFinal = parseInt(cantidadDespues.trim());
          expect(cantidadFinal).to.eq(cantidadInicial + 1);
        });
    });

  // Add to cart
  cy.get('[data-at="add-to-cart"]')
    .should('have.text', 'Añadir al carrito')
    .should('be.visible')
    .click();

  // Confirm notification
  cy.get('.ant-notification-notice').should('be.visible');
  cy.get('.ant-notification-notice-message')
    .should('have.text', 'Agregado al carrito')
    .should('be.visible');

  // Open the cart
  cy.get('[data-at="cart-opener"]')
    .should('exist')
    .should('be.visible')
    .click();

  // Validate cart content
  cy.get('.z-20 > .h-full')
    .should('be.visible')
    .contains('Bandas Elásticas de Resistencia');

  cy.get('.z-20 > .h-full')
    .should('be.visible')
    .contains('2');

  // Proceed to checkout
  cy.get('.bg-primaryColor')
    .should('have.text', 'Ir al checkout')
    .should('be.visible')
    .click();
});


// ───────────────────────────────────────────────────────────────
// Custom helper: Fill checkout form with fixture user2
// Inputs all required fields in the checkout page
// ───────────────────────────────────────────────────────────────
Cypress.Commands.add('fillCheckoutFormWithUser2', () => {
  cy.fixture('checkout_Info').then((data) => {
    const user = data.user2;

    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="lastname"]').type(user.lastName);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="address"]').type(user.address);
    cy.get('select[name="country"]').select(user.country);
    cy.get('input[name="nameHolder"]').type(user.cardName);
    cy.get('input[name="cardNumber"]').type(user.creditCard);
    cy.get('input[name="expiryDate"]').type(user.expDate);
    cy.get('input[name="securityCode"]').type(user.cvv).blur();
  });
});


// ───────────────────────────────────────────────────────────────
// Custom helper: Fill checkout form with fixture user1
// Inputs all required fields in the checkout page
// ───────────────────────────────────────────────────────────────
Cypress.Commands.add('fillCheckoutFormWithUser1', () => {
  cy.fixture('checkout_Info').then((data) => {
    const user = data.user1;

    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="lastname"]').type(user.lastName);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="address"]').type(user.address);
    cy.get('select[name="country"]').select(user.country);
    cy.get('input[name="nameHolder"]').type(user.cardName);
    cy.get('input[name="cardNumber"]').type(user.creditCard);
    cy.get('input[name="expiryDate"]').type(user.expDate);
    cy.get('input[name="securityCode"]').type(user.cvv).blur();
  });
});
