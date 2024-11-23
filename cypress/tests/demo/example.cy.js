/// <reference types="@apostrophecms-pro/cypress-tools/global" />

describe('Site Example (theme "demo")', () => {
  before(() => {
    // Required in order to use the fast login method
    Cypress.session.clearAllSavedSessions();
    // Reset with the preset from `apos-db/site-demo`.
    cy.task('apos:dbReset', 'site-demo');
    // The actual user, created by the command is `cy_admin`.
    // The original `admin` user created during the db dump is not used.
    cy.addUser('admin');
  });

  beforeEach(() => {
    cy.login('admin', { quick: true });
  });

  it('Visits the site', () => {
    cy.visit('/');
    cy.openPagesModal();
  });
});
