describe("The /login page", () => {
  it("successfully loads", () => {
    cy.catchErrors();

    const EMAIL = Cypress.env("EMAIL");
    const PASSWORD = Cypress.env("PASSWORD");

    // Visiting a login required page should redirect to /login
    cy.visit("/login");
    // cy.request("/login");
    cy.url().should("include", "/login");

    // Check password reset request page
    cy.contains("Forgot password?").click();
    cy.url().should("include", "/password_request");

    cy.get('wa-input[type="email"]').should("be.visible");
    cy.get('wa-input[type="email"').shadow().find("#input").should("exist");

    // Back to login
    cy.visit("/login");
    cy.url().should("include", "/login");

    // Toggle checkbox
    cy.get("wa-checkbox").invoke("prop", "checked").should("eq", true);
    cy.get("wa-checkbox").click();
    cy.get("wa-checkbox").invoke("prop", "checked").should("eq", false);
    cy.get("wa-checkbox").click();
    cy.get("wa-checkbox").invoke("prop", "checked").should("eq", true);

    // Wrong credentials
    cy.get('wa-input[type="email"]')
      .shadow()
      .find("#input")
      .type("fake@example.com");

    cy.get('wa-input[type="password"]')
      .shadow()
      .find("#input")
      .type("thisIsTheWrongPassword");

    cy.get('wa-button[type="submit"').click();

    cy.url().should("include", "/login");
    cy.contains("User not found").should("be.visible");

    // Wrong password
    cy.get('wa-input[type="email"]').shadow().find("#input").type(EMAIL);

    cy.get('wa-input[type="password"]')
      .shadow()
      .find("#input")
      .type("thisIsTheWrongPassword");

    cy.get('wa-button[type="submit"').click();
    cy.url().should("include", "/login");
    cy.contains("Try again").should("be.visible");

    // Email should be pre filled
    cy.get('wa-input[type="email"]')
      .invoke("prop", "value")
      .should("equal", EMAIL);

    cy.get('wa-input[type="password"]').shadow().find("#input").type(PASSWORD);

    cy.get('wa-button[type="submit"').click();

    cy.url().should("not.include", "/login");
  });
});
