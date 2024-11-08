export default function (site, config) {
  config.modules = {
    ...config.modules,
    'theme-demo': {
      options: {
        shortName: site.shortName
      }
    }
  };
};
