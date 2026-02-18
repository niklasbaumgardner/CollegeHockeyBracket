// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  const EMAIL = Cypress.env("EMAIL");
  const PASSWORD = Cypress.env("PASSWORD");

  cy.visit("/login");

  cy.url().should("include", "/login");

  cy.get('wa-input[type="email"').shadow().find("#input").type(EMAIL);

  cy.get('wa-input[type="password"').shadow().find("#input").type(PASSWORD);

  cy.get("wa-checkbox").invoke("prop", "checked").should("eq", true);
  cy.get("wa-checkbox").click();
  cy.get("wa-checkbox").invoke("prop", "checked").should("eq", false);
  cy.get("wa-checkbox").click();
  cy.get("wa-checkbox").invoke("prop", "checked").should("eq", true);

  cy.get('wa-button[type="submit"').click();

  cy.url().should("not.include", "/login");
});

Cypress.Commands.add("catchErrors", () => {
  cy.intercept("POST", /sentry\.io\/api\//, {}).as("sentry");

  Cypress.on("uncaught:exception", (err) => {
    if (
      err.message.includes(
        "ResizeObserver loop completed with undelivered notifications.",
      )
    ) {
      return false;
    }
  });
});
