module.exports = {
  options: {
    // Currently the best way to lock the page type of
    // the home page to something other than the default
    // is to reset the entire minimumPark option
    minimumPark: [
      {
        slug: '/',
        parkedId: 'home',
        _defaults: {
          title: 'Dashboard',
          type: 'site-page'
        },
        _children: [
          {
            slug: '/archive',
            parkedId: 'archive',
            type: '@apostrophecms/archive-page',
            archived: true,
            orphan: true,
            title: 'Archive'
          }
        ]
      }
    ],
    types: [
      {
        name: 'site-page',
        label: 'Sites Index'
      }
    ],
    quickCreate: false
  },
  methods(self, options) {
    return {
      async serveNotFound(req) {
        if (!req.user) {
          req.redirect = '/login';
          return;
        }
        if (self.isFound(req)) {
          return;
        }
        req.redirect = '/login';
      }
    };
  }
};
