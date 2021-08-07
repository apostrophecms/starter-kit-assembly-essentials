module.exports = {
  extend: '@apostrophecms/widget-type',
  icons: {
    'beer-icon': 'Beer'
  },
  options: {
    label: 'Products',
    icon: 'beer-icon'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Section Title'
      }
    }
  }
};
