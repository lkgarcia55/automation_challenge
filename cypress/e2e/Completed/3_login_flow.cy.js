describe('Login flow', () => {

  // Logs the start of the test suite
  it('Should log in successfully', () => {
    cy.task('logMessage', 'Login flow');
  });

  // Visit the login page before each test
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  // ─────────────────────────────────────────────────────────────
  // TITLE
  // ─────────────────────────────────────────────────────────────

  it('Title of the page', () => {
    cy.get('h1')
      .should('have.text', 'Inicia Sesión')
      .and('be.visible');
  });

  // ─────────────────────────────────────────────────────────────
  // EMAIL FIELD
  // ─────────────────────────────────────────────────────────────

  it('Email field - visible', () => {
    cy.get('input[name="email"]').should('be.visible');
  });

  it('Email field - character limit', () => {
    cy.get('input[name="email"]')
      .should('have.attr', 'maxlength', '90000');
  });
  
  // Verifies error messages for invalid emails using fixture
  it('Email field - error for invalid emails', () => {
    cy.fixture('emails').then((data) => {
      cy.wrap(data.invalidEmails).each((email) => {
        cy.get('input[name="email"]')
          .clear()
          .type(email)
          .blur();

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Email inválido');
      });
    });
  });

  it('Email field - error when email is cleared', () => {
    cy.get('input[name="email"]')
      .type('test@test')
      .clear()
      .get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // ─────────────────────────────────────────────────────────────
  // PASSWORD FIELD
  // ─────────────────────────────────────────────────────────────

  it('Password field - visible', () => {
    cy.get('input[name="password"]').should('be.visible');
  });

  it('Password field - character limit', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'maxlength', '90000');
  });

  // Verifies error messages for short passwords using fixture
  it('Password field - error for short passwords', () => {
    cy.fixture('passwords').then((data) => {
      cy.wrap(data.invalidPasswords).each((password) => {
        cy.get('input[name="password"]')
          .clear()
          .type(password)
          .blur();

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'La contraseña debe tener al menos 8 caracteres');
      });
    });
  });

  it('Email - error when email field is emptied', () => {
    cy.get('input[name="email"]')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  it('Password - error when password field is emptied', () => {
    cy.get('input[name="password"]')
      .type('test')
      .clear()
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });

  // ─────────────────────────────────────────────────────────────
  // REGISTER LINK
  // ─────────────────────────────────────────────────────────────

  it('Option for users who are not registered', () => {
    cy.contains('¿No tienes una cuenta?')
      .should('be.visible');

    cy.contains('a', 'Crea una')
      .should('exist')
      .should('have.attr', 'href', '/auth/signup')
      .click();
  });

  // ─────────────────────────────────────────────────────────────
  // PASSWORD RECOVERY
  // ─────────────────────────────────────────────────────────────

  it('Should open the password recovery modal', () => {
    cy.get('.mt-4.font-semibold')
      .should('have.text', '¿Olvidaste tu contraseña?')
      .should('be.visible')
      .click();

    cy.get('.swal2-popup')
      .should('exist')
      .and('be.visible');

    cy.get('h2')
      .should('have.text', 'Ingresa tu dirección email')
      .should('be.visible');

    cy.get('.swal2-confirm')
      .should('have.text', 'Recuperar contraseña')
      .should('be.visible');

    cy.get('input[name="email"]').should('be.visible');
  });

  // Validates email errors in the password recovery popup  
  it('Should show error for invalid and non-existing emails in recovery flow', () => {
    cy.get('.mt-4.font-semibold')
      .should('have.text', '¿Olvidaste tu contraseña?')
      .click();

    // First: emails with invalid format
    cy.fixture('emails').then((data) => {
      cy.wrap(data.recoverPassword).each((email) => {
        cy.get('.swal2-popup').should('be.visible');

        cy.get('#swal2-input')
          .clear()
          .type(email);

        cy.get('.swal2-confirm')
          .click();

        cy.get('#swal2-validation-message')
          .should('be.visible')
          .should('include.text', 'Ingresa un correo válido');
      });
    });

    // Second: emails not found in the system
    cy.fixture('emails').then((data) => {
      cy.wrap(data.emailNotFound).each((email) => {
        cy.get('.swal2-popup').should('be.visible');

        cy.get('#swal2-input')
          .clear()
          .type(email);

        cy.get('.swal2-confirm')
          .click();

        cy.get('#swal2-validation-message')
          .should('be.visible')
          .should('include.text', 'Usuario no está en la base de datos Error: User not found');
      });
    });
  });

  it('Forgot password flow - confirm token was sent when valid email is submitted in recovery', () => {
    cy.get('.mt-4.font-semibold')
      .should('have.text', '¿Olvidaste tu contraseña?')
      .click();

    cy.fixture('user_forgets_password').then((user) => {
      expect(user.email).to.exist; // Ensure fixture is loaded correctly

      cy.get('.swal2-popup').should('be.visible');

      cy.get('#swal2-input')
        .clear()
        .type(user.email);

      cy.get('.swal2-confirm').click();

      cy.get('h2')
        .should('be.visible')
        .should('include.text', 'Token enviado');

      cy.get('#swal2-html-container')
        .should('be.visible')
        .should('include.text', 'Revisa tu correo para recuperar tu contraseña');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // COMPLETE SCENARIO
  // ─────────────────────────────────────────────────────────────

  // Logs in a registered user using fixture data
  it('Registered user - using fixture', () => {
    cy.fixture('registered_user').then((user) => {
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);

      cy.get('[data-at="submit-login"]')
        .should('have.text', 'Iniciar Sesión')
        .should('be.visible')
        .click();

      cy.url().should('include', '/');
    });
  });

});
