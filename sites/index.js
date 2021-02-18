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
      '@apostrophecms-pro/basics-hero-widget': {},
      '@apostrophecms-pro/palette': {
        fields: {
          add: {
            backgroundColor: {
              label: 'Background color',
              type: 'color',
              help: 'The background of your website',
              selector: 'body',
              property: 'background-color',
              def: '#ffffff'
            },
            baseFont: {
              label: 'Font',
              type: 'select',
              help: 'Base font family for the website',
              selector: 'body',
              property: 'font-family',
              choices: [
                {
                  label: 'Helvetica',
                  value: 'helvetica',
                  def: true
                },
                {
                  label: 'Times',
                  value: 'times'
                }
              ]
            },
            baseFontSize: {
              label: 'Size',
              type: 'select',
              help: 'Base font size',
              selector: 'body',
              property: 'font-size',
              unit: 'px',
              choices: [
                {
                  label: '12px',
                  value: '12',
                  def: true
                },
                {
                  label: '15px',
                  value: '15'
                }
              ]
            },
            baseFontColor: {
              label: 'Color',
              type: 'color',
              selector: 'body',
              property: 'color',
              def: '#000000'
            },
            titleFont: {
              label: 'Font',
              type: 'select',
              help: 'Base font family for the website',
              selector: 'h1',
              property: 'font-family',
              choices: [
                {
                  label: 'Helvetica',
                  value: 'helvetica',
                  def: true
                },
                {
                  label: 'Times',
                  value: 'times'
                }
              ]
            }
          }
        },
        options: {
          paletteGroups: {
            page: {
              label: 'Page',
              fields: [ 'backgroundColor', 'primaryColor', 'secondaryColor' ]
            },
            typography: {
              label: 'Typography',
              fields: [],
              group: {
                default: {
                  label: 'Default',
                  fields: [ 'baseFont', 'baseFontSize', 'baseFontColor' ]
                },
                title: {
                  label: 'Title',
                  fields: [ 'titleFont' ]
                }
              }
            }
          }
        }
      }
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
