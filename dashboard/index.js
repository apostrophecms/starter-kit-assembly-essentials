const path = require('path');

const domains = require('../domains.js');

module.exports = {
  stagingBaseUrl: `https://dashboard.${domains.staging}`,
  prodBaseUrl: `https://dashboard.${domains.prod}`,
  modules: {
    'apostrophe-users': {},
    'apostrophe-pages': {},
    'apostrophe-templates': {
      viewsFolderFallback: path.join(
        __dirname, 'views'
      )
    },
    'apostrophe-assets': {
      lean: true,
      jQuery: 3
    },
    'apostrophe-attachments': {
      uploadfs: {
        disabledFileKey: 'ed01eaacc2a9dae5'
      }
    },
    'helpers': {},
    'sites': {},
    'sites-pages': {},
    'assets': {}
  }
};
