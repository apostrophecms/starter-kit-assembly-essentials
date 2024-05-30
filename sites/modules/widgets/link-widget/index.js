const link = require('../../../lib/schema/link');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Link',
    icon: 'cursor-default-click-icon'
  },
  fields: {
    add: link
  }
};
