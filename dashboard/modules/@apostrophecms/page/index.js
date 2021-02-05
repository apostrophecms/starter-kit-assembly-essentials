module.exports = {
  options: {
    park: [
      {
        slug: '/',
        parkedId: 'home',
        title: 'Sites',
        type: 'site-page',
        published: true,
        orphan: false
      }
    ],
    types: [
      {
        name: 'site-page',
        label: 'Sites Index'
      }
    ]
  },
  handlers(self, options) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = process.env.ENV === 'dev';
        }
      }
    };
  },
  methods(self, options) {
    return {
      async serveNotFound(req) {
        // If a non-logged-in user hits a 404/login protected page (home), redirect them to /login
        req.data.isDev = process.env.ENV === 'dev';
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
