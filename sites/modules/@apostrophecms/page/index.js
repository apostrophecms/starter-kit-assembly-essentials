module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  },
  handlers(self, options) {
    return {
      '@apostrophecms/page:beforeSend': {
        setTheme(req) {
          req.data.theme = self.apos.options.theme;
        }
      }
    };
  }
};
