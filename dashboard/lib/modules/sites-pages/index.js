module.exports = {
  extend: 'apostrophe-pieces-pages',
  label: 'Site Page',
  name: 'site-pages',
  perPage: 50,
  contextual: true,
  addFields: [],
  construct: function (self, options) {
    self.chooseParentPage = function (pages, piece) {
      return null;
    };
  }
};
