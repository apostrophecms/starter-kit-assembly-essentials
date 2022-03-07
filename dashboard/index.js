const domains = require('../domains.js');

module.exports = {
  privateDashboards: true,
  modules: {
    '@apostrophecms/attachment': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    helper: {},
    site: {},
    'site-page': {},
    asset: {}
  }
};
