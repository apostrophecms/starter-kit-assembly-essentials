const columnsWidget = require('../modules/@apostrophecms-pro/basics-column-widget');
const global = require('../modules/@apostrophecms/global');
const palette = require('../modules/theme-soci/lib/palette');

console.log(palette);

module.exports = function(site, config) {
  config.modules['@apostrophecms-pro/basics-column-widget'] = {
    options: {
      widgets: {
        ...columnsWidget.options.widgets,
        product: {}
      }
    }
  };
  global.fields.add = {
    ...global.fields.add,
    footerContent: {
      type: 'array',
      label: 'Footer Content',
      fields: {
        add: {
          header: {
            type: 'string',
            label: 'Column Header'
          },
          links: {
            type: 'area',
            label: 'Links and Content',
            options: {
              max: 1,
              widgets: {
                '@apostrophecms/rich-text': {
                  styles: [],
                  toolbar: [ 'link', 'orderedList' ]
                }
              }
            }
          }
        }
      }
    }
  };
  config.modules = {
    ...config.modules,
    'product-widget': {},
    'theme-demo': {},
    'theme-soci': {},
    location: {},
    'location-page': {},
    '@apostrophecms/global': {
      ...global
    },
    '@apostrophecms-pro/palette': {
      ...palette
    },
    '@apostrophecms/page': {
      options: {
        types: [
          {
            name: 'default-page',
            label: 'Default'
          },
          {
            name: '@apostrophecms/home-page',
            label: 'Home'
          },
          {
            name: 'location-page',
            label: 'Location Index'
          }
        ]
      }
    }
  };
};
