describe("Phonebook", () => {
  it("frontpage can be opened", () => {
    cy.visit("http://localhost:3001")
    cy.contains("Add new person:")
  })

  it("accepts a properly formatted new contact", () => {
    cy.visit("http://localhost:3001")
    cy.get("#newName").type("Valid name")
    cy.get("#newNumber").type("123-12345")
    cy.get("#submitNew").click()

    cy.contains("Valid name")
  })
})