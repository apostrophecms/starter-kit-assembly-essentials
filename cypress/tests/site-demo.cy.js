/// <reference types="@apostrophecms-pro/cypress-tools/global" />

describe('Site Example (theme "demo")', { baseUrl: 'http://site-demo.localhost:3000/' }, () => {
  before(() => {
    // Required in order to use the fast login method
    Cypress.session.clearAllSavedSessions();
    // Reset dashboard database
    cy.task('apos:dbReset', 'dashboard');
    // Reset the `site-demo` database
    cy.task('apos:dbReset', 'site-demo');
    // Create a user with `admin` role in the `site-demo` database
    cy.addUser('admin', 'site-demo');
  });

  beforeEach(() => {
    cy.login('admin', { quick: true });
    // Remove all image tags and default page documents before each test.
    cy.aposDeleteDocs({
      type: { $in: [ '@apostrophecms/image-tag', 'default-page' ] },
      profile: 'site-demo'
    });
  });

  it('Visits the site', () => {
    cy.visit('/');
    // Not required, here to show that the baseUrl is correct
    cy.url().should('eq', 'http://site-demo.localhost:3000/');
    // Showcase a random cy command working as expected
    cy.openPagesModal();
  });

  it('Adds pages and pieces', () => {
    // `profile` option is required to specify the site database, because
    // `demo-site` is not the default configuration.
    cy.addPiece({
      title: 'A tag',
      type: '@apostrophecms/image-tag'
    }, { profile: 'site-demo' });
    cy.addPage({
      title: 'A page',
      slug: '/a-page',
      type: 'default-page'
    }, { profile: 'site-demo' });

    cy.visit('/');
    cy.openPagesModal().as('pages');
    cy.get('@pages').findPage('A page');
    cy.get('@pages').findSecondaryButton('Exit').click();
    cy.hasModalCount(0);

    cy.openPieceModal([ 'Media', 'Image Tags' ], 'Manage Image Tags').as('piece');
    cy.get('@piece').findRecord('A tag');
  });
});
