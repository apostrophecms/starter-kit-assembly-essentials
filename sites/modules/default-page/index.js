module.exports = {
  extend: '@apostrophecms/page-type',
  fields: {
    add: {
      main: {
        type: 'area',
        label: 'Main',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-column': {}
          }
        }
      }
    }
  }
};
