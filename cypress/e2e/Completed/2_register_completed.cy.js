const { faker } = require('@faker-js/faker');

describe('Registration flow', () => {

  it('Should log in successfully', () => {
    cy.task('logMessage', 'Registration flow');
  });

  // ✅ Before each test, visit the signup page
  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  // -------------------- TITLE --------------------

  // Verifies the page title is correct and visible
  it('Title of the page', () => {
    cy.get('h1')
      .should('have.text', 'Crea un usuario nuevo')
      .and('be.visible');
  });

  // -------------------- EMAIL --------------------

  // Verifies the email field is visible
  it('Email field - visible', () => {
    cy.get('input[name="email"]')
      .should('be.visible');
  });

  // Checks that the email field has a character limit
  it('Email field - character limit', () => {
    cy.get('input[name="email"]')
      .should('have.attr', 'maxlength', '90000');
  });

  // Tests invalid emails and checks the error message
  it('Email field - write text in the field & error message', () => {
    cy.fixture('emails').then((data) => {
      cy.wrap(data.invalidEmails).each((email) => {
        cy.get('input[name="email"]')
          .clear()
          .type(email)
          .blur(); // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Email inválido');
      });
    });
  });

  // Verifies error message when clearing the email field after typing
  it('Email field - write text in the field', () => {
    cy.get('input[name="email"]')
      .type('test@test')
      .clear()
      .get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // -------------------- FULL NAME --------------------

  // Verifies the fullname field is visible
  it('Fullname field - visible', () => {
    cy.get('input[name="name"]')
      .should('be.visible');
  });

  // Checks that the fullname field has a character limit
  it('Fullname field - character limit', () => {
    cy.get('input[name="name"]')
      .should('have.attr', 'maxlength', '90000');
  });

  // Tests invalid names by typing and blurring (no specific error assertion)
  it('Fullname field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="name"]')
          .clear()
          .type(name)
          .blur(); // Simulate the user leaving the field
      });
    });
  });

  // -------------------- PASSWORD --------------------

  // Verifies the password field is visible
  it('Password field - visible', () => {
    cy.get('input[name="password"]')
      .should('be.visible');
  });

  // Checks that the password field has a character limit
  it('Password field - character limit', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'maxlength', '90000');
  });

  // Tests invalid passwords and checks the specific error message
  it('Password field - write password in the field & error message', () => {
    cy.fixture('passwords').then((data) => {
      cy.wrap(data.invalidPasswords).each((password) => {
        cy.get('input[name="password"]')
          .clear()
          .type(password)
          .blur(); // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'La contraseña debe tener al menos 8 caracteres');
      });
    });
  });

  // -------------------- CONFIRM PASSWORD --------------------

  // Verifies the confirm password field is visible
  it('Confirm repeat password field - visible', () => {
    cy.get('input[name="repeatPassword"]')
      .should('be.visible');
  });

  // Checks that the repeat password field has a character limit
  it('Confirm repeat field - character limit', () => {
    cy.get('input[name="repeatPassword"]')
      .should('have.attr', 'maxlength', '90000');
  });

  // Verifies error when passwords do not match
  it('Password field - write text in the field', () => {
    cy.get('input[name="password"]')
      .type('test@test');

    cy.fixture('passwords').then((data) => {
      cy.wrap(data.invalidRepasswords).each((password) => {
        cy.get('input[name="repeatPassword"]')
          .clear()
          .type(password)
          .blur(); // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Las contraseñas no coinciden');
      });
    });
  });

  // -------------------- FIELD CLEARING VALIDATIONS --------------------

  // Verifies error when email field content is cleared
  it('Email - validate error message when deleting field content', () => {
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur(); // Simulate the user leaving the field

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // Verifies error when name field content is cleared
  it('Name - validate error message when deleting field content', () => {
    cy.get('input[name="name"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur(); // Simulate the user leaving the field

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // Verifies error when password field content is cleared
  it('Password - validate error message when deleting field content', () => {
    cy.get('input[name="password"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur(); // Simulate the user leaving the field

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // Verifies error when repeat password field content is cleared
  it('Repeat password - validate error message when deleting field content', () => {
    cy.get('input[name="repeatPassword"]')
      .should('be.visible')
      .type('test')
      .clear()
      .blur(); // Simulate the user leaving the field

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // -------------------- LOGIN OPTION LINK --------------------

  // Verifies the link for users already have an account
  it('Option for users who already have an account', () => {
    cy.contains('¿Ya tienes una cuenta?')
      .should('be.visible');

    cy.contains('a', 'Inicia Sesión')
      .should('exist')
      .should('have.attr', 'href', '/auth/login');

    cy.contains('a', 'Inicia Sesión')
      .click();
  });

  // -------------------- COMPLETE SCENARIOS --------------------

  // Attempts to register an already existing user using fixture
  it('Already registered user - Fixtures', () => {
    cy.fixture('registered_user').then((user) => {
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="name"]').type(user.name);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[name="repeatPassword"]').type(user.password);

      cy.get('[data-at="submit-signup"]')
        .should('have.text', 'Crear Usuario')
        .should('be.visible')
        .click();
    });

    cy.get('#swal2-title')
      .should('be.visible')
      .should('have.text', 'Error');

    cy.get('#swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Este email ya está registrado');

    cy.get('.swal2-confirm')
      .should('be.visible')
      .should('have.text', 'Volver')
      .click();

    cy.url()
      .should('include', '/auth/signup'); 


  });

  // Registers a new user with dynamically generated data using faker
  it('New user registration successful', () => {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const password = faker.internet.password({ length: 10, memorable: true });

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="repeatPassword"]').type(password);

    cy.get('[data-at="submit-signup"]')
      .should('have.text', 'Crear Usuario')
      .should('be.visible')
      .click();

    cy.get('#swal2-title')
      .should('be.visible')
      .should('have.text', 'Operación Exitosa');

    cy.get('#swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Tu usuario ha sido creado correctamente. Sigue las indicaciones de tu instructor para poder activar tu cuenta.');

    cy.get('.swal2-confirm')
      .should('be.visible')
      .should('have.text', 'Ir al login')
      .click();

    cy.url()
      .should('include', '/auth/login');
  });

});
