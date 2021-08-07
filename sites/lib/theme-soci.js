const columnsWidget = require('../modules/@apostrophecms-pro/basics-column-widget');

module.exports = function(site, config) {
  config.modules['@apostrophecms-pro/basics-column-widget'] = {
    options: {
      widgets: {
        ...columnsWidget.options.widgets,
        product: {}
      }
    }
  };
  config.modules = {
    'product-widget': {},
    ...config.modules,
    'theme-demo': {},
    'theme-soci': {},
    location: {},
    'location-page': {},
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
