const path = require('path');

const domains = require('../domains.js');

module.exports = {
  stagingBaseUrl: `https://dashboard.${domains.staging}`,
  prodBaseUrl: `https://dashboard.${domains.prod}`,
  modules: {
    '@apostrophecms/template': {
      options: {
        viewsFolderFallback: path.join(
          __dirname, 'views'
        )
      }
    },
    '@apostrophecms/attachments': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    'helper': {},
    'site': {},
    'site-page': {},
    'asset': {}
  }
};
