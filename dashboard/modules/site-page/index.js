module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Site Page',
    perPage: 50
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
