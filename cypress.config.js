import { defineConfig } from 'cypress';
import plugins from './cypress/plugins/index.js';

export default defineConfig({
  viewportWidth: 1200,
  viewportHeight: 900,
  video: false,
  numTestsKeptInMemory: 20,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 0
  },
  env: {
    '@apostrophecms-pro/cypress-tools': {
      assembly: true,
      apiKey: 'cypressAPIKey',
      mongoURI: true,
      dbName: 'test-t0i63fmpmk34ylpu1b31ws6p',
      aposRoot: './sites',
      profiles: {
        'site-demo': {
          dbName: 'test-snfxk8h1grlrrkldsdntc1hh',
          baseUrl: 'http://site-demo.localhost:3000'
        },
        dashboard: {
          dbName: 'test-dashboard',
          aposRoot: './dashboard',
          baseUrl: 'http://dashboard.localhost:3000'
        }
      }
    }
  },
  e2e: {
    baseUrl: 'http://site-default.localhost:3000',
    specPattern: 'cypress/tests/**/*.cy.{js,vue,ts}',
    setupNodeEvents(on, config) {
      return plugins(on, config);
    }
  }
});
