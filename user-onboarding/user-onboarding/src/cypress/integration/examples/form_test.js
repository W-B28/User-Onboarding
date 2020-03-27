describe("Testing members form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  })
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("William")
      .should("have.value", "William");

    cy.get('input[name="email"]')
      .type("me@aol.com");

    cy.get('input[name="password"]')
      .type("password1");

    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");

    cy.get("button").click();

  it('check validation message on invalid input', () => {
    cy.get('input:invalid').should('have.length', 0)
    cy.get('[name="email"]').type("Must be a valid email address.")
    cy.get('[type="submit"]').click()
    cy.get('input[name="password"]').should('have.length', 8)
    cy.get('[type="email"]').then(($input) => {
    expect($input[0].validationMessage).to.eq('I expect an email!')
  })
})

  });
});
