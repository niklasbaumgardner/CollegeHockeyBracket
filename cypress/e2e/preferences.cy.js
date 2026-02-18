describe("The /preferences page", () => {
  it("successfully loads", () => {
    cy.login();
    cy.visit("/preferences");
    cy.url().should("include", "/preferences");

    // Check initial state
    cy.get("#themes").invoke("prop", "value").should("eq", "shoelace");
    cy.get("#mode").invoke("prop", "value").should("equal", "dark");

    cy.get("#primary-color").invoke("prop", "value").should("equal", null);
    cy.get("#background-color").invoke("prop", "value").should("equal", null);
    cy.get("#color-palette").invoke("prop", "value").should("equal", null);

    // Theme
    cy.get("#themes").click();
    cy.get("#themes").contains("Active").click();
    cy.get("html").should("have.class", "wa-theme-active");

    cy.get("#themes").click();
    cy.get("#themes").contains("Shoelace").click();
    cy.get("html").should("have.class", "wa-theme-shoelace");

    // Mode
    cy.get("#mode").click();
    cy.get("#mode").contains("Light").click();
    cy.get("html").should("have.class", "wa-light");

    cy.get("#mode").click();
    cy.get("#mode").contains("Dark").click();
    cy.get("html").should("have.class", "wa-dark");

    // Mode theme selector
    cy.get(".wa-desktop-only").find("nb-theme-selector").click();
    cy.get(".wa-desktop-only")
      .find("nb-theme-selector")
      .contains("Light")
      .click();
    cy.get("html").should("have.class", "wa-light");

    cy.get(".wa-desktop-only").find("nb-theme-selector").click();
    cy.get(".wa-desktop-only")
      .find("nb-theme-selector")
      .contains("Dark")
      .click();
    cy.get("html").should("have.class", "wa-dark");

    // primary color
    cy.get("#primary-color").click();
    cy.get("#primary-color").contains("Blue").click();
    cy.get("html").should("have.class", "blue-brand");

    cy.get("#primary-color")
      .shadow()
      .find('button[part="clear-button"]')
      .click();
    cy.get("html").should("not.have.class", "blue-brand");

    // background color
    cy.get("#background-color").click();
    cy.get("#background-color").contains("Green").click();
    cy.get("wa-page").should("have.class", "green-background");

    cy.get("#background-color")
      .shadow()
      .find('button[part="clear-button"]')
      .click();
    cy.get("wa-page").should("not.have.class", "green-background");

    // primary color
    cy.get("#color-palette").click();
    cy.get("#color-palette").contains("Elegant").click();
    cy.get("html").should("have.class", "wa-palette-elegant");

    cy.get("#color-palette")
      .shadow()
      .find('button[part="clear-button"]')
      .click();
    cy.get("html").should("not.have.class", "wa-palette-elegant");
  });
});
