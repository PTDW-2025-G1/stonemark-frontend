/// <reference types="cypress" />

describe('Contact Page', () => {
  const mockUser = {
    firstName: 'Ana',
    lastName: 'Silva',
    email: 'ana@site.com'
  };

  beforeEach(() => {
    cy.visit('/contact');
  });

  describe('Page Structure', () => {
    it('should display all main sections', () => {
      cy.get('app-contact-hero-section').should('be.visible');
      cy.get('app-contact-form').should('be.visible');
      cy.get('app-contact-info').should('be.visible');
      cy.get('app-response-time').should('be.visible');
      cy.get('app-faq-section').should('be.visible');
    });

    it('should have correct page title', () => {
      cy.contains('h2', 'Send Us a Message').should('be.visible');
    });
  });

  describe('Contact Form Validation', () => {
    it('should show validation errors when submitting empty form', () => {
      cy.get('#name').focus().blur();
      cy.get('#email').focus().blur();
      cy.get('#message').focus().blur();

      cy.get('button[type="submit"]').click({ force: true });

      cy.contains('Name is required').should('be.visible');
      cy.contains('Valid email is required').should('be.visible');
      cy.contains('Message must be at least 10 characters').should('be.visible');
    });

    it('should validate email format', () => {
      cy.get('#email').type('invalid-email').blur();
      cy.contains('Valid email is required').should('be.visible');
    });

    it('should validate message minimum length', () => {
      cy.get('#message').type('Short').blur();
      cy.contains('Message must be at least 10 characters').should('be.visible');
    });

    it('should disable submit button when form is invalid', () => {
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });

  describe('Form Submission', () => {
    it('should successfully submit valid form', () => {
      cy.intercept('POST', '**/contact-requests', {
        statusCode: 200,
        body: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'General',
          message: 'This is a test message'
        }
      }).as('submitContact');

      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('app-shared-select').click();
      cy.contains('General Inquiry').click();
      cy.get('#message').type('This is a valid message to send');

      cy.get('button[type="submit"]').should('not.be.disabled');
      cy.get('button[type="submit"]').click();

      cy.wait('@submitContact');

      cy.contains('Message Sent!').should('be.visible');
      cy.contains("Thanks! We'll be in touch soon.").should('be.visible');
    });

    it('should show loading state during submission', () => {
      cy.intercept('POST', '**/contact-requests', (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: { id: 1 }
        });
      }).as('slowSubmit');

      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('app-shared-select').click();
      cy.contains('General Inquiry').click();
      cy.get('#message').type('This is a test message');

      cy.get('button[type="submit"]').click();
      cy.contains('Sending...').should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });

  describe('Form Error Handling', () => {
    it('should display error message on submission failure', () => {
      cy.intercept('POST', '**/contact-requests', {
        statusCode: 500,
        body: { message: 'Server error' }
      }).as('failedSubmit');

      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('app-shared-select').click();
      cy.contains('General Inquiry').click();
      cy.get('#message').type('This is a test message');

      cy.get('button[type="submit"]').click();
      cy.wait('@failedSubmit');

      cy.contains('Something went wrong. Please try again later.').should('be.visible');
    });
  });

  describe('Subject Selection', () => {
    const subjects = [
      'General Inquiry',
      'Technical Support',
      'Partnership/Collaboration',
      'Report a Bug',
      'Feature Request',
      'Other'
    ];

    it('should display all subject options', () => {
      cy.get('app-shared-select').click();
      subjects.forEach(subject => {
        cy.contains(subject).should('exist');
      });
    });

    it('should select each subject option', () => {
      subjects.forEach(subject => {
        cy.get('app-shared-select').click();
        cy.contains(subject).click({ force: true });
        cy.get('app-shared-select').should('contain', subject);
      });
    });
  });

  describe('Authenticated User', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'FAKE_TOKEN');

      cy.intercept('GET', '**/account/profile', {
        statusCode: 200,
        body: mockUser
      }).as('getCurrentUser');

      cy.visit('/contact');
    });

    it('should pre-fill form with user data', () => {
      cy.wait('@getCurrentUser');

      cy.get('#name').should('have.value', 'Ana Silva');
      cy.get('#email').should('have.value', 'ana@site.com');
    });

    it('should allow user to modify pre-filled data', () => {
      cy.wait('@getCurrentUser');

      cy.get('#name').should('have.value', 'Ana Silva');
      cy.get('#email').should('have.value', 'ana@site.com');

      cy.get('#name').clear().type('João Santos');
      cy.get('#email').clear().type('joao@example.com');

      cy.get('#name').should('have.value', 'João Santos');
      cy.get('#email').should('have.value', 'joao@example.com');
    });
  });

  describe('Responsive Design', () => {
    it('should display correctly on mobile', () => {
      cy.viewport('iphone-x');
      cy.get('app-contact-form').should('be.visible');
      cy.get('.grid-cols-1').should('exist');
    });

    it('should display correctly on tablet', () => {
      cy.viewport('ipad-2');
      cy.get('app-contact-form').should('be.visible');
    });

    it('should display correctly on desktop', () => {
      cy.viewport(1920, 1080);
      cy.get('.lg\\:grid-cols-3').should('exist');
    });
  });
});
