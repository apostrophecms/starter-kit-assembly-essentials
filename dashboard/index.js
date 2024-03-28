const themes = require('../themes');
const baseUrlDomains = require('../domains');

module.exports = {
  privateDashboards: true,
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    helper: {},
    '@apostrophecms-pro/multisite-dashboard': {},
    '@apostrophecms-pro/site': {
      options: {
        themes,
        baseUrlDomains
      }
    },
    '@apostrophecms-pro/site-page': {},
    asset: {}
  }
};
