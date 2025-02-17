/// <reference types="@apostrophecms-pro/cypress-tools/global" />

describe('Dashboard', { baseUrl: 'http://dashboard.localhost:3000/' }, () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
    cy.task('apos:dbReset', 'dashboard');
    cy.addUser('admin', 'dashboard');
  });

  beforeEach(() => {
    cy.login('admin', { quick: true });
  });

  it('Visits the site', () => {
    cy.visit('/');
    // Not needed, here to show that the baseUrl is correct
    cy.url().should('eq', 'http://dashboard.localhost:3000/');
    // Showcase a random cy command working as expected
    cy.contains('h3', 'Site - Theme Default');
    cy.contains('h3', 'Site - Theme Demo');
    cy.openPieceModal('Sites', 'Manage Sites');
  });
});
