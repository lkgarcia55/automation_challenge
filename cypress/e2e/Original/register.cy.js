const { faker } = require('@faker-js/faker');

describe('Registration flow', () => {

  // ✅ Before each test, visit this page

  beforeEach(() => {
    cy.visit('/auth/signup')
  })

  it('Title of the page', () => {
    cy.get('h1')
    .should('have.text','Crea un usuario nuevo')
    .and('be.visible');
  });

  it('Email field - visible', () => {
    cy.get('input[name="email"]')
    .should('be.visible');
  });

  it('Email field - character limit', () => {
    cy.get('input[name="email"]')
    .should('have.attr', 'maxlength', '90000');
  });

  it('Email field - write text in the field & error message', () => {
    cy.fixture('emails').then((data) => {
    cy.wrap(data.invalidEmails).each((email) => {

        // Clean and write the email
        cy.get('input[name="email"]')
          .clear()
          .type(email)
          .blur();  // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Email inválido');
      });
    });
  });

  it('Email field - write text in the field', () => {
    cy.get('input[name="email"]')
    .type('test@test')
    .clear()
    .get('p.text-red-500')
    .should('be.visible')
    .and('have.text', 'Este campo es requerido');
  });

  it('Fullname field - visible', () => {
    cy.get('input[name="name"]')
    .should('be.visible');
  });

  it('Fullname field - character limit', () => {
    cy.get('input[name="name"]')
    .should('have.attr', 'maxlength', '90000');
  });
  
  it('Fullname field - write text in the field & error message', () => {
    cy.fixture('names').then((data) => {
    cy.wrap(data.invalidNames).each((name) => {

        // Clean 
        cy.get('input[name="name"]')
          .clear()
          .type(name)
          .blur();  // Simulate the user leaving the field
      });
    });
  });

  it('Password field - visible', () => {
    cy.get('input[name="password"]')
    .should('be.visible');
  });

  it('Password field - character limit', () => {
    cy.get('input[name="password"]')
    .should('have.attr', 'maxlength', '90000');
  });

  it('Password field - write password in the field & error message', () => {
    cy.fixture('passwords').then((data) => {
    cy.wrap(data.invalidPasswords).each((password) => {

        // Clean and write the password
        cy.get('input[name="password"]')
          .clear()
          .type(password)
          .blur();  // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'La contraseña debe tener al menos 8 caracteres')
      });
    });
  });

  it('Confirm repeat password field - visible', () => {
    cy.get('input[name="repeatPassword"]')
    .should('be.visible');
  });

  it('Confirm repeat field - character limit', () => {
    cy.get('input[name="repeatPassword"]')
    .should('have.attr', 'maxlength', '90000');
  });

  it('Password field - write text in the field', () => {
    cy.get('input[name="password"]')
    .type('test@test')
  
    cy.fixture('passwords').then((data) => {
    cy.wrap(data.invalidRepasswords).each((password) => {

        // Clean and write the password
        cy.get('input[name="repeatPassword"]')
          .clear()
          .type(password)
          .blur();  // Simulate the user leaving the field

        cy.get('p.text-red-500')
          .should('be.visible')
          .and('have.text', 'Las contraseñas no coinciden')
      });
    });
  });

  it('Email - validate error message when deleting field content', () => {
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('test');

    cy.get('input[name="email"]')
      .clear();

    cy.get('input[name="email"]')
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  }); 

  it('Name - validate error message when deleting field content', () => {
    cy.get('input[name="name"]')
      .should('be.visible')
      .type('test');

    cy.get('input[name="name"]')
      .clear();

    cy.get('input[name="name"]')
      .blur();

    cy.get('p.text-red-500')
      .should('be.visible')
      .and('have.text', 'Este campo es requerido');
  });
    
it('Password - validate error message when deleting field content', () => {
  cy.get('input[name="password"]')
    .should('be.visible')
    .type('test');

  cy.get('input[name="password"]')
    .clear();

  cy.get('input[name="password"]')
    .blur();

  cy.get('p.text-red-500')
    .should('be.visible')
    .and('have.text', 'Este campo es requerido');
  });  

  it('Repeat password - validate error message when deleting field content', () => {
  cy.get('input[name="repeatPassword"]')
    .should('be.visible')
    .type('test');

  cy.get('input[name="repeatPassword"]')
    .clear();

  cy.get('input[name="repeatPassword"]')
    .blur();

  cy.get('p.text-red-500')
    .should('be.visible')
    .and('have.text', 'Este campo es requerido');
  }); 

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
    .should('have.text','Error');

  cy.get('#swal2-html-container')
    .should('be.visible')
    .should('have.text','Este email ya está registrado');
  });

  it('New user registration successful', () => {
    // Unique dynamic data on each run
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const password = faker.internet.password({ length: 10, memorable: true });

    // Fill out the form with random data
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="repeatPassword"]').type(password);

    // Verify and click the registration button
    cy.get('[data-at="submit-signup"]')
      .should('have.text', 'Crear Usuario')
      .should('be.visible')
      .click();

    cy.get('#swal2-title')
    .should('be.visible')
    .should('have.text','Operación Exitosa');

    cy.get('#swal2-html-container')
    .should('be.visible')
    .should('have.text','Tu usuario ha sido creado correctamente. Sigue las indicaciones de tu instructor para poder activar tu cuenta.');  

    cy.get('.swal2-confirm')
    .should('be.visible')
    .should('have.text','Ir al login')
    .click()
    cy.url()
    .should('include','/auth/login');
  });

})