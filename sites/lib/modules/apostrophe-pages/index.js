module.exports = {
  // Add your ordinary page types here, see also views/pages
  types: [
    {
      name: 'default',
      label: 'Default'
    },
    {
      name: 'home',
      label: 'Home'
    }
  ],
  construct: (self, options) => {
    self.on('apostrophe-pages:beforeSend', 'webpack', (req) => {
      req.data.isDev = process.env.ENV === 'dev';
      req.data.theme = self.apos.options.theme;
    });
  }
};
