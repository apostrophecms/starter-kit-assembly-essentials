module.exports = function(site, config) {
  config.modules = {
    ...config.modules,
    'theme-demo': {},
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
