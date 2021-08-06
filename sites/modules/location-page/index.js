module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Location Index Page',
    pluralLabel: 'Locatoin Index Pages'
  },
  fields: {
    add: {
      intro: {
        type: 'area',
        options: {
          limit: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'link',
                'blockquote'
              ]
            }
          }
        }

      }
    }
  }
  // Infers from its name that it will display an index of articles,
  // as well as serving subpages for them
};
