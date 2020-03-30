import generate from "../../test-utils/generate";

describe("Auth flow", () => {
  it("Redirects to /login if not authorized", () => {
    // All commands in cypress are run sequentially
    // and the next command wont run if previous didn't finish
    // cy.visit(url) will wait for a succesfull response and throw if it gets 400 || 500
    cy.visit("http://localhost:3000/");
    // cy.url() give you access to current url
    cy.url().should("equal", `${window.location.origin}/login`);
  });
  it("Logins a user succesfully", () => {
    cy.visit("http://localhost:3000/");
    // cy.url() give you access to current url
    cy.url().should("equal", `${window.location.origin}/login`);
    // findBy & findAllBy queries are case sensitive by default
    cy.findByPlaceholderText(/email/i).type("anna@email.com");
    cy.findByPlaceholderText("Password").type("anna");
    cy.findByTestId("login-button").click();
    cy.url().should("equal", `${window.location.origin}/`);
  });
  it("Registers a new user succesfully", () => {
    const user = generate.user();
    cy.visit("http://localhost:3000/register");
    cy.findByPlaceholderText(/email/i).type(user.email);
    cy.findByPlaceholderText(/username/i).type(user.name);
    cy.findByPlaceholderText(/^password$/i).type(user.password);
    cy.findByPlaceholderText(/confirm password/i).type(user.password);
  });
});
