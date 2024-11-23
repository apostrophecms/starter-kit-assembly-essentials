/// <reference types="@apostrophecms-pro/cypress-tools/global" />

describe('Dashboard Example', () => {
  before(() => {
    // Required in order to use the fast login method
    Cypress.session.clearAllSavedSessions();
    // Reset with the preset from from `apos-db/dashboard`.
    cy.task('apos:dbReset', 'dashboard');
    // The actual user, created by the command is `cy_admin`.
    // The original `admin` user created during the db dump is not used.
    cy.addUser('admin');
  });

  beforeEach(() => {
    cy.login('admin', { quick: true });
  });

  it('Visits the dashboard', () => {
    cy.visit('/');
    cy.contains('h3', 'Demo');
    cy.contains('h3', 'Default');
  });
});
