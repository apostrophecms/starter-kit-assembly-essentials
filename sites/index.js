const path = require('path');
const paletteConfig = require('./modules/@apostrophecms-pro/palette/lib');

module.exports = function (site) {
  const config = {
    bundles: [ '@apostrophecms-pro/basics' ],
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    modules: {
      '@apostrophecms/template': {
        options: {
          viewsFolderFallback: path.join(
            __dirname, 'views'
          )
        }
      },
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
      // TODO: reactivate after PRs land
      // // Strongly recommended: allows editing the site appearance via the UI
      // '@apostrophecms-pro/palette': {
      //   options: {
      //     paletteFields: paletteConfig.fields,
      //     arrangePaletteFields: paletteConfig.arrangement
      //   }
      // },
      // Just a nice place to keep our helper functions and macros that are
      // used across all sites
      'helpers': {},
      'default-page': {},
      'home-page': {},
      // required for bundled modules or extending views
      '@apostrophecms-pro/basics': {},
      // optional widgets
      '@apostrophecms-pro/basics-image-widget': {},
      '@apostrophecms-pro/basics-column-widget': {},
      '@apostrophecms-pro/basics-button-widget': {},
      '@apostrophecms-pro/basics-card-widget': {},
      '@apostrophecms-pro/basics-hero-widget': {},
      '@apostrophecms-pro/basics-footer-widget': {}
    }
  };
  // Allow each theme to modify the configuration object,
  // enabling additional modules etc.
  require(`./lib/theme-${site.theme}.js`)(site, config);
  return config;
};

// Generate URL prefixes for locales, if the site is localized

function getPrefixes (locales) {
  if (!(locales && locales.length)) {
    return null;
  }
  const prefixes = {};

  locales.forEach(locale => {
    prefixes[locale.name] = '/' + locale.name.toLowerCase();
  });
  return prefixes;
};
