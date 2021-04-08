module.exports = {
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
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
