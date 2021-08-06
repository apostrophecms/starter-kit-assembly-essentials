const classes = require('./lib/helpers/classes');

module.exports = function (site) {
  const config = {
    bundles: [ '@apostrophecms-pro/basics' ],
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    modules: {
      '@apostrophecms/attachment': {
        options: {
          uploadfs: {
            // Be sure to change
            disabledFileKey: 'CHANGEME'
          }
        }
      },
      '@apostrophecms/express': {
        options: {
          session: {
            secret: 'CHANGEME'
          }
        }
      },
      // Just a nice place to keep our helper functions and macros that are
      // used across all sites
      helpers: {},
      'content-placeholder': {},
      'default-page': {},

      // The @apostrophecms/home-page module always exists, no need to activate it here

      // required for bundled modules or extending views
      '@apostrophecms-pro/basics': {},
      // optional widgets
      '@apostrophecms-pro/basics-slideshow-widget': {
        options: {
          className: classes.WIDGET
        }
      },
      '@apostrophecms-pro/basics-column-widget': {},
      '@apostrophecms-pro/basics-button-widget': {
        options: {
          className: classes.WIDGET
        }
      },
      '@apostrophecms-pro/basics-card-widget': {
        options: {
          className: classes.WIDGET
        }
      },
      '@apostrophecms-pro/basics-hero-widget': {
        options: {
          className: classes.WIDGET
        }
      },
      '@apostrophecms-pro/basics-footer-widget': {},
      '@apostrophecms-pro/palette': {}
    }
  };
  // Allow each theme to modify the configuration object,
  // enabling additional modules etc.
  require(`./lib/theme-${site.theme}.js`)(site, config);
  return config;
};
