module.exports = {
  privateDashboards: true,
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    helper: {},
    site: {},
    'site-page': {},
    asset: {}
  }
};
