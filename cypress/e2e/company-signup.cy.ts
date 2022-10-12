describe("company signup", () => {
  it("Company signup flow", () => {
    // Visit company page
    cy.visit("/accounts/signup");

    // Click on company login choice
    cy.contains("I want to assess potential employees")
      .click();

    // Continue to next page and check if it actually redirects
    cy.contains("Next").click();

    cy.contains("Your details").should("exist");

    // Error when directly submit
    cy.contains("Next").click();

    cy.contains("Please fill in this field.").should("exist");

    // Fill in the fields and submit
    cy.get("input").type("PT. Minterm Indonesia");
    cy.get("textarea").eq(0).type("Sudirman Central Business District");
    cy.get("textarea").eq(1).type("Company Description example");
    cy.contains("Next").click();

    // Ensure that it's already in the next page
    cy.contains("Email Address *").should("exist");

    // Fill in the email and ensure error
    cy.contains("Email Address *").siblings("input").eq(0).type("rashad");
    cy.contains("Submit").click();
    cy.contains("Please enter a valid email.").should("exist");

    // Fill in correct email
    cy.get("input")
      .eq(0)
      .type(
        "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}minterm@mintan.com"
      );

    // Check if password and confirm password still needs to be fiilled
    cy.contains("Submit").click();
    cy.contains("Please fill in this field").should("exist");

    // Check all possible password combinations
    cy.get("input").eq(1).type("abcd");
    cy.contains("Submit").click();
    cy.contains("Your password should have at least 8 characters").should(
      "exist"
    );

    // Check if all lowercase
    cy.get("input")
      .eq(1)
      .type("{backspace}{backspace}{backspace}{backspace}abcdefghi");
    cy.contains("Submit").click();
    cy.contains("Your password should have at least 1 uppercase letter").should(
      "exist"
    );

    // Check if uppercase and lowercase
    cy.get("input")
      .eq(1)
      .type(
        "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}ABCDEasdfdI"
      );
    cy.contains("Submit").click();
    cy.contains("Your password should have at least 1 number");

    // Check if passwod errors doesn't exist
    cy.get("input")
      .eq(1)
      .type(
        "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}12345AabC"
      );
    cy.contains("Submit").click();
    cy.contains("Your password should have at least 8 characters").should(
      "not.exist"
    );
    cy.contains("Your password should have at least 1 uppercase letter").should(
      "not.exist"
    );
    cy.contains("Your password should have at least 1 number").should(
      "not.exist"
    );

    // Check if input confirmed password different with real password
    cy.get("input").eq(2).type("ajdsfkljkj");
    cy.contains("Submit").click();
    cy.contains("Your password is not identical to your confirmed password.").should("exist");

    // Click eye icon change type of password
    cy.get("input").eq(1).should("have.attr", "type", "password");
    cy.get("input").eq(1).siblings("svg").eq(0).click();
    cy.get("input").eq(1).should("have.attr", "type", "text");
    cy.get("input").eq(1).siblings("svg").eq(0).click();
    cy.get("input").eq(1).should("have.attr", "type", "password");

    // Submit form
    cy.contains("Submit").click();
    
  });
});

export {};
