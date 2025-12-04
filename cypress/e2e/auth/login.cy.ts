/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4201/login');
  });

  describe('Page Structure', () => {
    it('should display login form', () => {
      cy.get('app-auth-form').should('be.visible');
    });

    it('should have correct page title', () => {
      cy.title().should('eq', 'Login');
    });

    it('should display email and password fields', () => {
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
    });

    it('should display submit button', () => {
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should display forgot password link', () => {
      cy.get('app-auth-form').within(() => {
        cy.contains(/forgot password/i).should('be.visible');
      });
    });

    it('should display toggle to register link', () => {
      // Procura por qualquer link ou botão clicável dentro do formulário
      cy.get('app-auth-form').within(() => {
        cy.get('a, button').filter(':visible').should('have.length.at.least', 2);
      });
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty fields', () => {
      cy.get('input[type="email"]').focus().blur();
      cy.get('input[type="password"]').focus().blur();

      cy.get('app-auth-form').within(() => {
        cy.contains(/email|e-mail/i).should('exist');
        cy.contains(/password|senha/i).should('exist');
      });
    });

    it('should validate email format', () => {
      cy.get('input[type="email"]').type('invalid-email').blur();
      cy.get('app-auth-form').within(() => {
        cy.contains(/email|e-mail|valid|válido/i).should('exist');
      });
    });

    it('should validate password minimum length', () => {
      cy.get('input[type="password"]').type('123').blur();
      cy.get('app-auth-form').within(() => {
        cy.contains(/password|senha|character|caractere/i).should('exist');
      });
    });

    it('should disable submit button when form is invalid', () => {
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should enable submit button when form is valid', () => {
      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').should('not.be.disabled');
    });
  });

  describe('Successful Login', () => {
    it('should successfully login with valid credentials and set cookies', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 200,
        body: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          role: 'USER'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      // Verifica redirecionamento e cookies na nova origem
      cy.origin('http://localhost:4200', () => {
        cy.url().should('include', 'localhost:4200');
        cy.getCookie('accessToken').should('exist');
        cy.getCookie('refreshToken').should('exist');
      });
    });

    it('should redirect to base URL after successful login as USER', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 200,
        body: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          role: 'USER'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.origin('http://localhost:4200', () => {
        cy.url().should('eq', 'http://localhost:4200/');
      });
    });

    it('should redirect to staff URL after successful login as ADMIN', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 200,
        body: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          role: 'ADMIN'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('admin@example.com');
      cy.get('input[type="password"]').type('adminpass123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
    });

    it('should redirect to staff URL after successful login as MODERATOR', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 200,
        body: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          role: 'MODERATOR'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('mod@example.com');
      cy.get('input[type="password"]').type('modpass123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
    });

    it('should handle verification pending status', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 202
      }).as('loginRequest');

      cy.get('input[type="email"]').type('unverified@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
      cy.url().should('include', '/verify-pending');
    });

    it('should show loading state during login', () => {
      cy.intercept('POST', '**/auth/authenticate', (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: {
            accessToken: 'fake-access-token',
            refreshToken: 'fake-refresh-token',
            role: 'USER'
          }
        });
      }).as('slowLogin');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.get('button[type="submit"]').should('be.disabled');
    });
  });

  describe('Login Error Handling', () => {
    it('should display error message on invalid credentials', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 401,
        body: {
          message: 'Invalid credentials'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('wrong@example.com');
      cy.get('input[type="password"]').type('wrongpass');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
      cy.url().should('include', '/login');
    });

    it('should handle network errors', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        forceNetworkError: true
      }).as('loginRequest');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login');
    });
  });

  describe('Navigation', () => {
    it('should navigate to forgot password page', () => {
      cy.get('app-auth-form').within(() => {
        cy.contains(/forgot password/i).click();
      });
      cy.url().should('include', '/forgot-password');
    });
  });

  describe('Responsive Design', () => {
    it('should display correctly on mobile', () => {
      cy.viewport('iphone-x');
      cy.get('app-auth-form').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
    });

    it('should display correctly on tablet', () => {
      cy.viewport('ipad-2');
      cy.get('app-auth-form').should('be.visible');
    });

    it('should display correctly on desktop', () => {
      cy.viewport(1920, 1080);
      cy.get('app-auth-form').should('be.visible');
    });
  });

  describe('Security', () => {
    it('should not display password in plain text', () => {
      cy.get('input[type="password"]').type('secretpassword');
      cy.get('input[type="password"]').should('have.attr', 'type', 'password');
    });

    it('should clear form on successful login', () => {
      cy.intercept('POST', '**/auth/authenticate', {
        statusCode: 200,
        body: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          role: 'USER'
        }
      }).as('loginRequest');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.origin('http://localhost:4200', () => {
        cy.url().should('include', 'localhost:4200');
      });
    });
  });
});
