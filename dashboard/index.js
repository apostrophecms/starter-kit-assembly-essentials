import themes from '../themes.js';
import baseUrlDomains from '../domains.js';

export default {
  root: import.meta,
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
    '@apostrophecms/vite': {}
  }
};
