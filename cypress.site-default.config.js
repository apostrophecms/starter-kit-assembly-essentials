const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures/default',
  downloadsFolder: 'cypress/downloads/default',
  screenshotsFolder: 'cypress/screenshots/default',
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'test-j47k2538yhvy440spdlu8pti',
      aposRoot: './sites'
    }
  },
  e2e: {
    baseUrl: 'http://default.localhost:3000',
    specPattern: 'cypress/tests/default/**/*.cy.{js,vue,ts}',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    }
  }
});
