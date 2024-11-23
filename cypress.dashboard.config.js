const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'a3ab-dashboard',
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
