/// <reference types="cypress" />

import { SELECTORS } from "./selectors"

// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}


Cypress.Commands.add('openIngredientModal', (ingredient) => {
    cy.get(SELECTORS.ingredientItem)
    .contains(ingredient)
    .click();

    cy.get(SELECTORS.modal)
    .should('exist')
    .within(() => {
        cy.contains(ingredient).should('be.visible')
    });
});

Cypress.Commands.add('closeModal', () => {
    cy.get(SELECTORS.modalXButton).click();
    cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('addIngredient', (ingredient) => {
    cy.get(SELECTORS.ingredientItem)
    .contains(ingredient)
    .parent()
    .find(SELECTORS.addButton)
    .click()
});

Cypress.Commands.add('verifyIngredient', (selector, ingredientName) => {
    cy.get(selector)
    .should('exist')
    .and('be.visible')
    .and('contain', ingredientName)
})
