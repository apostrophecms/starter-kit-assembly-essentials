const path = require('path');

const configs = require('require-all')({
  dirname: path.join(
    __dirname, 'lib/configs'
  )
});

module.exports = {
  fields: {
    add: filter(configs, 'add'),
    group: filter(configs, 'group')
  }
};

function filter(config, key) {
  let items = {};

  for (const config of Object.keys(configs)) {
    items = {
      ...items,
      ...configs[config][key]
    };
  };

  return items;
}
