describe('Login flow', () => {

  // ✅ Before each test, visit the signup page
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  // -------------------- TITLE --------------------

  // Verifies the page title is correct and visible
  it('Title of the page', () => {
    cy.get('h1')
      .should('have.text', 'Inicia Sesión')
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

 // --------------------  --------------------

it('Option for users who are not registered', () => {
  // Verify the first part of the message is visible
  cy.contains('¿No tienes una cuenta?')
    .should('be.visible');

  // Verify that the link with the text "Crea una" exists and has the correct href
  cy.contains('a', 'Crea una')
    .should('exist')
    .should('have.attr', 'href', '/auth/signup');

  // Click the link to navigate to the signup page
  cy.contains('a', 'Crea una')
    .click();
  });

 // --------------------  --------------------

 it('Check the password recovery link', () => {
  // Verify the first part of the message is visible
  cy.get('.mt-4.font-semibold')
    .should('have.text', '¿Olvidaste tu contraseña?')
    .should('be.visible')
    .click();
    
  cy.get('.swal2-popup')
    .should('exist')
    .and('be.visible');

  cy.get('h2')
    .should('have.text','Ingresa tu dirección email')
    .should('be.visible');

  cy.get('.swal2-confirm')
    .should('have.text','Recuperar contraseña')
    .should('be.visible'); 

  cy.get('input[name="email"]')
    .should('be.visible');

  });  

 it('Email field - show validation message after clicking CTA', () => {
  // Step 1: Click "¿Olvidaste tu contraseña?"
  cy.get('.mt-4.font-semibold')
    .should('have.text', '¿Olvidaste tu contraseña?')
    .should('be.visible')
    .click();

  // Step 2: Loop through invalid emails
  cy.fixture('emails').then((data) => {
    cy.wrap(data.recoverPassword).each((email) => {
      // Step 3: Ensure the modal is visible
      cy.get('.swal2-popup').should('be.visible');

      // Step 4: Enter invalid email in modal input
      cy.get('#swal2-input')
        .clear()
        .type(email)
    

      // Step 5: Click the CTA button to trigger validation
      cy.get('.swal2-confirm')
        .should('be.visible')
        .click();

      // Step 6: Assert the validation message is shown
      cy.get('#swal2-validation-message')
        .should('be.visible')
        .should('include.text', 'Ingresa un correo válido');
    });

    cy.fixture('emails').then((data) => {
    cy.wrap(data.recoverPassword).each((email) => {
      // Step 3: Ensure the modal is visible
      cy.get('.swal2-popup').should('be.visible');

      // Step 4: Enter invalid email in modal input
      cy.get('#swal2-input')
        .clear()
        .type(email)
    

      // Step 5: Click the CTA button to trigger validation
      cy.get('.swal2-confirm')
        .should('be.visible')
        .click();

      // Step 6: Assert the validation message is shown
      cy.get('#swal2-validation-message')
        .should('be.visible')
        .should('include.text', 'Ingresa un correo válido');

        });
    });
  });

 
});
  

 // -------------------- COMPLETE SCENARIOS --------------------

 // Login of a registered user using fixture
  it('Registered user - Fixtures', () => {
    cy.fixture('registered_user').then((user) => {
    //console.log('📦 Loaded user fixture:', user);     
    //expect(user.email, 'Email is defined').to.exist;
    //expect(user.password, 'Password is defined').to.exist;  
      
    cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);

      cy.get('[data-at="submit-login"]')
        .should('have.text', 'Iniciar Sesión')
        .should('be.visible')
        .click();

      cy.url()
        .should('include','/');
    });
  });  

   // -------------------- --------------------

it('Forgot password - Fixtures', () => {
  // Click the "Forgot password?" link
  cy.get('.mt-4.font-semibold')
    .should('have.text', '¿Olvidaste tu contraseña?')
    .should('be.visible')
    .click();    

  // Load fixture data
  cy.fixture('user_forgets_password').then((user) => {
    expect(user.email).to.exist; // Sanity check

    // Wait for the modal
    cy.get('.swal2-popup').should('be.visible');

    // Type email from fixture
    cy.get('#swal2-input')
      .clear()
      .type(user.email);

    // Click confirm
    cy.get('.swal2-confirm')
      .should('be.visible')
      .click();

     cy.get('h2')
        .should('be.visible')
        .should('include.text', 'Token enviado');

      cy.get('#swal2-html-container')
        .should('be.visible')
        .should('include.text', 'Revisa tu correo para recuperar tu contraseña');      
  });
});




});