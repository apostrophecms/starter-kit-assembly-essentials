const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures/demo',
  downloadsFolder: 'cypress/downloads/demo',
  screenshotsFolder: 'cypress/screenshots/demo',
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'test-ga5mh3pedr02ztdtzxn1mpi2',
      aposRoot: './sites'
    }
  },
  e2e: {
    baseUrl: 'http://demo.localhost:3000',
    specPattern: 'cypress/tests/demo/**/*.cy.{js,vue,ts}',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    }
  }
});
