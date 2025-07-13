const { faker } = require('@faker-js/faker');

describe('Registration flow', () => {

  // Logs the start of the test suite
  it('Should log in successfully', () => {
    cy.task('logMessage', 'Registration flow');
  });

  // Visit the signup page before each test
  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  // ─────────────────────────────────────────────────────────────
  // TITLE
  // ─────────────────────────────────────────────────────────────

  it('Title of the page', () => {
    cy.get('h1')
      .should('have.text', 'Crea un usuario nuevo')
      .and('be.visible');
  });

  // ─────────────────────────────────────────────────────────────
  // EMAIL FIELD
  // ─────────────────────────────────────────────────────────────

  it('Email field - visible', () => {
    cy.get('input[name="email"]').should('be.visible');
  });

  it('Email field - character limit', () => {
    cy.get('input[name="email"]').should('have.attr', 'maxlength', '90000');
  });

  it('Email field - write text in the field & error message', () => {
    cy.fixture('emails').then((data) => {
      cy.wrap(data.invalidEmails).each((email) => {
        cy.get('input[name="email"]').clear().type(email).blur();
        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Email inválido');
      });
    });
  });

  it('Email field - write text in the field', () => {
    cy.get('input[name="email"]').type('test@test').clear();
    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // ─────────────────────────────────────────────────────────────
  // FULL NAME FIELD
  // ─────────────────────────────────────────────────────────────

  it('Fullname field - visible', () => {
    cy.get('input[name="name"]').should('be.visible');
  });

  it('Fullname field - character limit', () => {
    cy.get('input[name="name"]').should('have.attr', 'maxlength', '90000');
  });

  it('Fullname field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
      cy.wrap(data.invalidNames).each((name) => {
        cy.get('input[name="name"]').clear().type(name).blur();
      });
    });
  });

  // ─────────────────────────────────────────────────────────────
  // PASSWORD FIELD
  // ─────────────────────────────────────────────────────────────

  it('Password field - visible', () => {
    cy.get('input[name="password"]').should('be.visible');
  });

  it('Password field - character limit', () => {
    cy.get('input[name="password"]').should('have.attr', 'maxlength', '90000');
  });

  it('Password field - write password in the field & error message', () => {
    cy.fixture('passwords').then((data) => {
      cy.wrap(data.invalidPasswords).each((password) => {
        cy.get('input[name="password"]').clear().type(password).blur();
        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'La contraseña debe tener al menos 8 caracteres');
      });
    });
  });

  // ─────────────────────────────────────────────────────────────
  // CONFIRM PASSWORD FIELD
  // ─────────────────────────────────────────────────────────────

  it('Confirm repeat password field - visible', () => {
    cy.get('input[name="repeatPassword"]').should('be.visible');
  });

  it('Confirm repeat field - character limit', () => {
    cy.get('input[name="repeatPassword"]').should('have.attr', 'maxlength', '90000');
  });
  
  // Verifies error when passwords do not match
  it('Password field - write text in the field', () => {
    cy.get('input[name="password"]').type('test@test');

    cy.fixture('passwords').then((data) => {
      cy.wrap(data.invalidRepasswords).each((password) => {
        cy.get('input[name="repeatPassword"]').clear().type(password).blur();
        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Las contraseñas no coinciden');
      });
    });
  });

  // ─────────────────────────────────────────────────────────────
  // FIELD CLEARING VALIDATIONS
  // ─────────────────────────────────────────────────────────────

  it('Email - validate error message when deleting field content', () => {
    cy.get('input[name="email"]').type('test').clear().blur();
    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  it('Name - validate error message when deleting field content', () => {
    cy.get('input[name="name"]').type('test').clear().blur();
    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  it('Password - validate error message when deleting field content', () => {
    cy.get('input[name="password"]').type('test').clear().blur();
    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

   // Verifies error when password field content is cleared
  it('Repeat password - validate error message when deleting field content', () => {
    cy.get('input[name="repeatPassword"]').type('test').clear().blur();
    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // ─────────────────────────────────────────────────────────────
  // LOGIN LINK
  // ─────────────────────────────────────────────────────────────

  it('Option for users who already have an account', () => {
    cy.contains('¿Ya tienes una cuenta?').should('be.visible');

    cy.contains('a', 'Inicia Sesión')
      .should('exist')
      .should('have.attr', 'href', '/auth/login');

    cy.contains('a', 'Inicia Sesión').click();
  });

  // ─────────────────────────────────────────────────────────────
  // COMPLETE SCENARIOS
  // ─────────────────────────────────────────────────────────────

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

    cy.url().should('include', '/auth/signup');
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

    cy.url().should('include', '/auth/login');
  });

});
