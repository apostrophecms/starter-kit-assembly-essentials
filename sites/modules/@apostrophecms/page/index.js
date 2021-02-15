module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'home-page',
        label: 'Home'
      }
    ]
  },
  handlers(self, options) {
    return {
      '@apostrophecms/page:beforeSend': {
        devAndTheme(req) {
          req.data.isDev = process.env.ENV === 'dev';
          req.data.theme = self.apos.options.theme;
        }
      }
    };
  }
};
