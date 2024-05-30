/**
 * Shared Sites configuration
 *
 * Enabling and configuring a module here will allow the
 * module to be used as configured on all sites.
 */

module.exports = function (site) {
  const config = {
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    nestedModuleSubdirs: true,
    modules: {
      '@apostrophecms/uploadfs': {
        options: {
          uploadfs: {
            // TODO: Be sure to change
            disabledFileKey: 'CHANGEME'
          }
        }
      },
      '@apostrophecms/express': {
        options: {
          session: {
            // TODO: Be sure to change
            secret: 'CHANGEME'
          }
        }
      },

      helpers: {},

      'default-page': {},

      '@apostrophecms-pro/palette': {},
      '@apostrophecms-pro/document-versions': {},

      websocket: {}
    }
  };

  /**
   * Allow each theme to modify the configuration object,
   * enabling additional modules etc.
   */
  require(`./lib/theme-${site.theme}.js`)(site, config);

  return config;
};
