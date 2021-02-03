const path = require('path');
const paletteConfig = require('./lib/modules/apostrophe-palette-global/lib');

module.exports = function (site) {
  const config = {
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    modules: {
      'apostrophe-assets': {
        // Optional. Removes the weight of jQuery, lodash, moment, etc.
        // from the logged-out public experience. You can import anything
        // you need in your index.js, since webpack is present. To avoid
        // breaking the logged-in experience, you should do not push those
        // libraries globally either. Just depend on them via import
        lean: true,
        // Strongly recommended (so the admin UI does not use out of date jQuery)
        jQuery: 3
      },
      'apostrophe-templates': {
        viewsFolderFallback: path.join(
          __dirname, 'views'
        )
      },
      'apostrophe-open-graph': {},
      'apostrophe-seo': {},
      'apostrophe-site-map': {
        noPriority: true
      },
      'apostrophe-browser-requirements': {
        // Suggested: minimum IE version 11, otherwise
        // the user receives a friendly prompt to visit
        // Browse Happy to determine how best to upgrade
        // (IE before 11 is not supported by Microsoft)
        minimums: {
          ie: 11
        },
        browseHappy: true
      },
      'apostrophe-attachments': {
        // Suggested: allow svg in image widgets etc.
        svgImages: true,
        uploadfs: {
          // Be sure to change
          disabledFileKey: 'ai2uh398h23'
        }
      },
      'apostrophe-express': {
        session: {
          secret: 'oiq2j089qj3'
        }
      },
      // Strongly recommended: allows editing the site appearance via the UI
      'apostrophe-palette': {},
      'apostrophe-palette-widgets': {},
      'apostrophe-palette-global': {
        paletteFields: paletteConfig.fields,
        arrangePaletteFields: paletteConfig.arrangement
      },
      // Recommended, allows draft editing
      // Also provides localization for sites that need it
      'apostrophe-workflow': {
        alias: 'workflow',
        // Configurable locales per site via the dashboard UI
        locales: (site.locales && site.locales.length) ? [
          {
            name: 'default',
            label: 'Default',
            children: site.locales
          }
        ] : null,
        prefixes: getPrefixes(site.locales),
        // Recommended, not all documents are needed in every locale
        replicateAcrossLocales: false,
        excludeTypes: []
      },
      // Recommended, provides a "manage" view of uncommitted documents etc.
      'apostrophe-workflow-modified-documents': {},
      'apostrophe-video-widgets': {
        // Recommended. When in lean mode our standard widget players must be
        // expressly activated. Allows youtube embed
        player: true
      },
      // Just a nice place to keep our helper functions and macros that are
      // used across all sites
      'helpers': {},
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
