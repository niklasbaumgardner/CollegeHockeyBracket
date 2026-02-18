describe("The /signup page", () => {
  it("successfully loads", () => {
    const EMAIL = Cypress.env("EMAIL");
    const PASSWORD = Cypress.env("PASSWORD");

    cy.visit("/login");
    cy.url().should("include", "/login");

    cy.get('wa-input[type="email"]')
      .shadow()
      .find("#input")
      .type("fake@example.com");

    cy.get('wa-input[type="password"]').shadow().find("#input").type("123456");

    cy.get('wa-button[type="submit"').click();

    // Login should fail
    cy.url().should("include", "/login");

    cy.contains("User not found").should("be.visible");

    cy.contains("Sign Up").click();
    cy.url().should("include", "/signup");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", true);

    // New email not taken
    cy.get("#email").shadow().find("#input").clear().type(EMAIL);

    cy.get("#email").shadow().contains("Email taken").should("not.exist");

    // New username not taken
    cy.get("#username").shadow().find("#input").type("niklas");

    cy.get("#username").shadow().contains("Username taken").should("not.exist");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", true);

    cy.get("#username").shadow().contains("Username taken").should("not.exist");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", false);

    cy.get("#password1").shadow().find("#input").type(PASSWORD);

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", false);

    cy.get("#submitButton").click();

    cy.visit("/login");
    cy.url().should("include", "/login");

    cy.login();
  });
});
