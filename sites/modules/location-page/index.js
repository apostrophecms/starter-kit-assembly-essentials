module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Location Index Page',
    pluralLabel: 'Locatoin Index Pages',
    ignoreNoCodeWarning: true,
    ignoreUnusedFolderWarning: true
  },
  fields: {
    add: {
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-column': {},
            '@apostrophecms-pro/basics-hero': {}
          }
        }
      }
    }
  }
  // Infers from its name that it will display an index of articles,
  // as well as serving subpages for them
};
