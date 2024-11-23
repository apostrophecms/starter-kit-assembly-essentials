const { plugin } = require('@apostrophecms-pro/cypress-tools');

module.exports = (on, config) => {
  plugin(on, config);
  return config;
};
