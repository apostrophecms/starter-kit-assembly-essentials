module.exports = {
  fields: {
    add: {
      main: {
        type: 'area',
        label: 'Main',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-column': {
              class: 'o-widget'
            },
            '@apostrophecms-pro/basics-hero': {
              class: 'o-widget'
            }
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
