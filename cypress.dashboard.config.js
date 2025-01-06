const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures/dashboard',
  downloadsFolder: 'cypress/downloads/dashboard',
  screenshotsFolder: 'cypress/screenshots/dashboard',
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'test-dashboard',
      aposRoot: './dashboard'
    }
  },
  e2e: {
    baseUrl: 'http://dashboard.localhost:3000',
    specPattern: 'cypress/tests/dashboard/**/*.cy.{js,vue,ts}',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    }
  }
});
