/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe("Login", () => {
  // Test case 1
    it("should display login page correctly", () => {

      cy.visit("http://localhost:5173/login");

      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get("button[type='submit']").should("be.visible");
    });

    // Test case 2
    it("should display alert when email is empty", () => {
      cy.visit("http://localhost:5173/login");

      cy.on('window:alert', (str) => {
        expect(str).to.equal('"id" is not allowed to be empty');
      });
    });

    // Test case 3
    it("should display alert when password is empty", () => {
      cy.visit("http://localhost:5173/login");

      cy.get('input[name="email"]').type("a@a.com");

      cy.get('button').contains(/^Login$/).click();

      cy.on('window:alert', (str) => {
        expect(str).to.equal('"password" is not allowed to be empty');
      });
    });

    // Test case 4
    it("should display alert when email and password are wrong", () => {
      cy.visit("http://localhost:5173/login");

      cy.get('input[name="email"]').type("rahmat");

      cy.get('input[name="password"]').type("rahmat");

      cy.get('button').contains(/^Login$/).click();

      cy.on('window:alert', (str) => {
        expect(str).to.equal('User ID or password is wrong');
      });
    });

    // Test case 5
    it("should display homepage when email and password are correct", () => {
      cy.visit("http://localhost:5173/login");

      cy.get('input[name="email"]').type("vxc@gmail.com");

      cy.get('input[name="password"]').type("1234567");

      cy.get('button').contains(/^Login$/).click();

      cy.url().should('include', '/');

      cy.wait(10000);

      cy.contains('Logout').click();
    });
  });