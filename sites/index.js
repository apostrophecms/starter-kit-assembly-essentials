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
      helpers: {},
      'default-page': {},

      // The @apostrophecms/home-page module always exists, no need to activate it here

      // required for bundled modules or extending views
      '@apostrophecms-pro/basics': {},
      // optional widgets
      '@apostrophecms-pro/basics-slideshow-widget': {
        options: {
          // TODO: Update to `className` when available in Basics
          class: 'o-widget'
        }
      },
      '@apostrophecms-pro/basics-column-widget': {},
      '@apostrophecms-pro/basics-button-widget': {},
      '@apostrophecms-pro/basics-card-widget': {
        options: {
          // TODO: Update to `className` when available in Basics
          class: 'o-widget'
        }
      },
      '@apostrophecms-pro/basics-hero-widget': {
        options: {
          // TODO: Update to `className` when available in Basics
          class: 'o-widget'
        }
      },
      '@apostrophecms-pro/basics-footer-widget': {},
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
              type: 'assemblyFontFamily',
              help: 'Base font family for the website',
              selector: 'body',
              property: 'font-family'
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
              type: 'assemblyFontFamily',
              help: 'Base font family for the website',
              selector: 'h1',
              property: 'font-family'
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
