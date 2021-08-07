const columnsWidget = require('../modules/@apostrophecms-pro/basics-column-widget');
const global = require('../modules/@apostrophecms/global');

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
    ...generateFooterAreas()
  };
  config.modules = {
    'product-widget': {},
    ...config.modules,
    'theme-demo': {},
    'theme-soci': {},
    location: {},
    'location-page': {},
    '@apostrophecms/global': {
      ...global
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

function generateFooterAreas() {
  return {
    footerColOneLinks: {
      type: 'area',
      label: 'Footer Column One Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
    footerColOneHeader: {
      type: 'area',
      label: 'Footer Column One Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
    footerColTwoLinks: {
      type: 'area',
      label: 'Footer Column Two Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
    footerColTwoHeader: {
      type: 'area',
      label: 'Footer Column Two Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
    footerColThreeLinks: {
      type: 'area',
      label: 'Footer Column Three Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
    footerColThreeHeader: {
      type: 'area',
      label: 'Footer Column Three Links',
      options: {
        max: 1,
        widgets: {
          '@apostrophecms/rich-text': {
            styles: [],
            toolbar: []
          }
        }
      }
    },
  };
}
