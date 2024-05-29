module.exports = function (site) {
  const config = {
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    nestedModuleSubdirs: true,
    modules: {
      '@apostrophecms/uploadfs': {
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

      // The @apostrophecms/home-page module always exists, no need to activate it here
      'default-page': {},

      '@apostrophecms-pro/palette': {},
      '@apostrophecms-pro/document-versions': {},

      websocket: {}
    }
  };

  // Allow each theme to modify the configuration object,
  // enabling additional modules etc.
  require(`./lib/theme-${site.theme}.js`)(site, config);

  return config;
};
