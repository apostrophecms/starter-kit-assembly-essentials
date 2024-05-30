module.exports = {
  fields: {
    add: {
      main: {
        type: 'area',
        label: 'Main',
        options: {
          widgets: {
            hero: {
              /**
               * We could allow the editor choose a display option but
               * we always want the Hero to cover the width of the screen
               * on the Homepage. We're passing an option to our widget
               * here so that the appearance always stays consistent
               * for this area.
               */
              fullWidth: true
            },
            column: {}
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
