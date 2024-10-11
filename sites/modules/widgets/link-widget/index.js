import link from '../../../lib/schema/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Link',
    icon: 'cursor-default-click-icon'
  },
  fields: {
    add: link
  }
};
