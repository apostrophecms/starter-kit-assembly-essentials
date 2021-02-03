module.exports = {
  park: [
    {
      title: 'Styleguide',
      type: 'styleguide',
      slug: '/styleguide',
      published: true,
      orphan: true
    },
  ],
  types: [
    {
      name: 'home',
      label: 'Home'
    },
    {
      name: 'site-pages',
      label: 'Sites Index'
    }
  ],
  construct: (self, options) => {
    self.on('apostrophe-pages:beforeSend', 'webpack', (req) => {
      req.data.isDev = process.env.ENV === 'dev';
    });

    // If a non-logged hits a 404/login protected page (home), redirect them to /login
    self.serveNotFound = function (req, callback) {
      req.data.isDev = process.env.ENV === 'dev';
      if (!req.user) {
        req.redirect = '/login';
        return callback(null);
      }
      if (self.isFound(req)) {
        return setImmediate(callback);
      }

      req.redirect = '/login';
      return callback(null);
    };
  }
};
