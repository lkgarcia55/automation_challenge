describe('Checkout flow', () => {

  it('Should log in successfully', () => {
    cy.task('logMessage', 'Checkout flow');
  });

  // ✅ Before each test, do this
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.loginWithFixture('registered_user');
    cy.url().should('not.include', '/auth/login');
    cy.visit('/checkout');
  });

  // -------------------- TITLE --------------------

  it('Title of the page', () => {
    cy.get('h1')
      .should('have.text', 'Checkout')
      .and('be.visible');
  });

  it('Verify form - Buyer information', () => {
    cy.get('.roudned > .text-2xl')
      .should('have.text', 'Información del comprador')
      .and('be.visible');
  });

  it('Verify form - Payment information', () => {
    cy.get('form > .rounded > .text-2xl')
      .should('have.text', 'Información de Pago')
      .and('be.visible');
  });


  // -------------------- NAME FIELD --------------------

  it('Name field - visible', () => {
    cy.get('input[name="name"]')
      .should('be.visible');
  });

  it('Name field - character limit', () => {
    cy.get('input[name="name"]')
      .should('have.attr', 'maxlength', '90000');
  });

  it('Name field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="name"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  }); // ✅ Cerramos correctamente el bloque

  it('Name - validate error message when deleting field content', () => {
    cy.get('input[name="name"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // -------------------- LASTNAME FIELD --------------------

  it('Lastname field - visible', () => {
    cy.get('input[name="lastname"]')
      .should('be.visible');
  });

  it('Lastname field - character limit', () => {
    cy.get('input[name="lastname"]')
      .should('have.attr', 'maxlength', '90000');
  });

  it('Lastname field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="lastname"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  }); // ✅ Cerramos correctamente este bloque también

  it('Lastname - validate error message when deleting field content', () => {
    cy.get('input[name="lastname"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // -------------------- EMAIL FIELD --------------------

  it('Email field - visible', () => {
    cy.get('input[name="email"]')
      .should('be.visible');
  });

  it('Email field - character limit', () => {
    cy.get('input[name="email"]')
      .should('have.attr', 'maxlength', '90000');
  });

  it('Email field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="email"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  }); // 

  it('Email - validate error message when deleting field content', () => {
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'El correo no es válido');
  });

  // -------------------- ADDRESS FIELD --------------------

  it('Address field - visible', () => {
    cy.get('input[name="address"]')
      .should('be.visible');
  });

  it('Address field - character limit', () => {
    cy.get('input[name="address"]')
      .should('have.attr', 'maxlength', '90000');
  });

  it('Address - validate error message when deleting field content', () => {
    cy.get('input[name="address"]')
      .should('be.visible')
      .type('12')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  }); 

 // -------------------- COUNTRY FIELD --------------------

  it('Country dropdown - visible', () => {
    cy.get('select[name="country"]')
      .should('be.visible');
  });

  it('Country dropdown', () => {
    cy.get('select[name="country"]')
      .select('Chile')
      .should('be.visible')
      .and('have.value', 'Chile');
  });

 // -------------------- CREDIT CARD NAME FIELD --------------------

 it('Credit card name - visible', () => {
    cy.get('input[name="nameHolder"]')
      .should('be.visible');
  });

  it('Credit card name - character limit', () => {
    cy.get('input[name="nameHolder"]')
      .should('have.attr', 'maxlength', '90000');
  });

   it('Credit card name field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="nameHolder"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  });

  it('Credit card name - validate error message when deleting field content', () => {
    cy.get('input[name="nameHolder"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

 // -------------------- CREDIT CARD NUMBER FIELD --------------------

  it('Credit card number - visible', () => {
    cy.get('input[name="cardNumber"]')
      .should('be.visible');
  });

  it('Credit card number - character limit', () => {
    cy.get('input[name="cardNumber"]')
      .should('have.attr', 'maxlength', '19');
  });

   it('Credit card name field - write text in the field', () => {
    cy.fixture('credit_card').then((data) => {
      cy.wrap(data.invalidInfo).each((name) => {
        cy.get('input[name="cardNumber"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  });

 // -------------------- CREDIT CARD EXPIRATION DATE FIELD --------------------
  
 it('Credit card expiration date - visible', () => {
    cy.get('input[name="expiryDate"]')
      .should('be.visible');
  });

 it('Credit card expiration date - write text in the field', () => {
    cy.fixture('credit_card').then((data) => {
      cy.wrap(data.dateInfo).each((name) => {
        cy.get('input[name="expiryDate"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  });
 // -------------------- CREDIT CARD SECURITY CODE FIELD --------------------

it('Credit card security code - visible', () => {
    cy.get('input[name="securityCode"]')
      .should('be.visible');
  });

  it('Credit card security code - character limit', () => {
    cy.get('input[name="securityCode"]')
      .should('have.attr', 'maxlength', '3');
  });

   it('Credit card security code field - write text in the field & error message', () => {
    cy.fixture('credit_card').then((data) => {
      cy.wrap(data.securityCode).each((name) => {
        cy.get('input[name="securityCode"]')
          .clear()
          .type(name)
          .blur();
      });
    });
  });

  it('Credit card security code - validate error message when deleting field content', () => {
    cy.get('input[name="securityCode"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'El código debe tener 3 dígitos');
  });

 // -------------------- COMPLETE FLOW WITH INCORRECT DATA --------------------

  it('Full flow with incorrect data - validate error message when deleting field content', () => {  
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
    cy.get('input[name="securityCode"]').type(user.cvv)
    .blur();
    });
  });


});
