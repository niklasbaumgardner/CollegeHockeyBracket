describe("The /profile page", () => {
  it("successfully loads", () => {
    const EMAIL = Cypress.env("EMAIL");
    const EMAIL1 = Cypress.env("EMAIL1");
    const PASSWORD = Cypress.env("PASSWORD");
    const PASSWORD1 = Cypress.env("PASSWORD1");

    cy.login();
    cy.url().should("include", "/profile");

    // Check initial state
    cy.get("#submitButton").invoke("prop", "disabled").should("eq", true);
    cy.get("#email").invoke("prop", "value").should("equal", EMAIL);
    cy.get("#username").invoke("prop", "value").should("equal", "niklas");

    // Update
    cy.get("#email").shadow().find("#input").clear().type(EMAIL1);
    cy.get("#username").shadow().find("#input").type("1");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", false);

    cy.wait(500);

    cy.get("#submitButton").click();
    cy.url().should("include", "/profile");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", true);
    cy.get("#email").invoke("prop", "value").should("equal", EMAIL1);
    cy.get("#username").invoke("prop", "value").should("equal", "niklas1");

    cy.get("#email").shadow().find("#input").clear().type(EMAIL);
    cy.get("#username").shadow().find("#input").type("{backspace}");

    cy.get("#submitButton").invoke("prop", "disabled").should("eq", false);

    cy.wait(500);
    cy.get("#submitButton").click();

    // Back to initial state
    cy.get("#submitButton").invoke("prop", "disabled").should("eq", true);
    cy.get("#email").invoke("prop", "value").should("equal", EMAIL);
    cy.get("#username").invoke("prop", "value").should("equal", "niklas");

    // TODO: reset password
    cy.contains("Reset password").click();
    cy.url().should("include", "/password_reset");

    cy.get('wa-button[type="submit"')
      .invoke("prop", "disabled")
      .should("eq", true);

    cy.get("#password1").shadow().find("#input").type(PASSWORD);
    cy.get("#password2").shadow().find("#input").type(PASSWORD1);

    cy.get('wa-button[type="submit"')
      .invoke("prop", "disabled")
      .should("eq", true);

    cy.get("#password1").shadow().find("#input").clear().type(PASSWORD1);

    cy.get('wa-button[type="submit"')
      .invoke("prop", "disabled")
      .should("eq", true);

    cy.contains("Password").should("be.visible");
  });
});
