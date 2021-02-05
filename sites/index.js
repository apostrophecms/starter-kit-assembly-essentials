const path = require('path');
const paletteConfig = require('./lib/modules/apostrophe-palette-global/lib');

module.exports = function (site) {
  const config = {
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    modules: {
      '@apostrophecms/template': {
        viewsFolderFallback: path.join(
          __dirname, 'views'
        )
      },
      '@apostrophecms/attachment': {
        uploadfs: {
          // Be sure to change
          disabledFileKey: 'CHANGEME'
        }
      },
      '@apostrophecms/express': {
        session: {
          secret: 'CHANGEME'
        }
      },
      // Strongly recommended: allows editing the site appearance via the UI
      '@apostrophecms/palette': {
        paletteFields: paletteConfig.fields,
        arrangePaletteFields: paletteConfig.arrangement
      },
      // Just a nice place to keep our helper functions and macros that are
      // used across all sites
      'helper': {},
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
