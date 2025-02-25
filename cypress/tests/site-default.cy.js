/// <reference types="@apostrophecms-pro/cypress-tools/global" />

describe('Site Example (theme "default")', () => {
  before(() => {
    // Required in order to use the fast login method
    Cypress.session.clearAllSavedSessions();
    // Reset dashboard database
    cy.task('apos:dbReset', 'dashboard');
    // Site with shortName `site-default` is our default configuration,
    // so we can omit the `profile` argument.
    cy.task('apos:dbReset'/* , 'site-default' */);
    // The actual user, created by the command is `cy_admin`.
    // The original `admin` user created during the db dump is not used.
    // Providing the `site-default` profile to create the user in the correct
    // site database is optional, because our default configuration is the
    // site 'site-default'.
    cy.addUser('admin'/* , 'site-default' */);
  });

  beforeEach(() => {
    cy.login('admin', { quick: true });
    // Remove all image tags and default page documents before each test.
    cy.aposDeleteDocs({
      type: { $in: [ '@apostrophecms/image-tag', 'default-page' ] }
    });
  });

  it('Visits the site', () => {
    cy.visit('/');
    // Not required, here to show that the baseUrl is correct
    cy.url().should('eq', 'http://site-default.localhost:3000/');
    // Showcase a random cy command working as expected
    cy.openPagesModal();
  });

  it('Adds pages and pieces', () => {
    cy.addPiece({
      title: 'A tag',
      type: '@apostrophecms/image-tag'
    });
    cy.addPage({
      title: 'A page',
      slug: '/a-page',
      type: 'default-page'
    });

    cy.visit('/');
    cy.openPagesModal().as('pages');
    cy.get('@pages').findPage('A page');
    cy.get('@pages').findSecondaryButton('Exit').click();
    cy.hasModalCount(0);

    cy.openPieceModal([ 'Media', 'Image Tags' ], 'Manage Image Tags').as('piece');
    cy.get('@piece').findRecord('A tag');
  });
});
