module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Site Page',
    perPage: 50,
    contextual: true
  },
  methods(self, options) {
    return {
      chooseParentPage(pages, piece) {
        return null;
      }
    };
  }
};
