const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'a3ab-nhcpc7a64rasnqlpv4wxjhdr',
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
