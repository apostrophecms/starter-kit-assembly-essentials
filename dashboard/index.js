const themes = require('../themes');
const baseUrlDomains = require('../domains');

module.exports = {
  privateDashboards: true,
  modules: {
    '@apostrophecms/express': {
      options: {
        session: {
          secret: 'CHANGEME'
        }
      }
    },

    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },

    '@apostrophecms-pro/multisite-dashboard': {},

    site: {
      options: {
        themes,
        baseUrlDomains
      }
    },
    'site-page': {},

    asset: {}
  }
};
