const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    '@apostrophecms-pro/cypress-tools': {
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'a3ab-mmbj7ed7xptpn4ap0st9btyr',
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
