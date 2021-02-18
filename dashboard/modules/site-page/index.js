module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Site Page',
    perPage: 50,
    // No editable content on the page and no subpages,
    // so the context bar is just confusing. You can remove
    // this if you decide your dashboard homepage will have
    // editable content, or subpages
    contextBar: false
  },
  methods(self, options) {
    return {
      chooseParentPage(pages, piece) {
        return null;
      }
    };
  },
  extendMethods(self, options) {
    return {
      indexQuery(_super, req) {
        const query = _super(req);
        query.and({
          temporary: {
            $ne: true
          }
        });
        return query;
      }
    };
  }
};
