const path = require('path');
const configs = require('require-all')({
  dirname: path.join(
    __dirname, 'configs'
  )
});

function generateFields (configs) {
  let fields = [];
  for (const config of Object.keys(configs)) {
    fields = fields.concat(configs[config].schema);
  };

  return fields;
}

function generateArrangements (configs) {
  const arrangement = [];
  for (const config of Object.keys(configs)) {
    arrangement.push(configs[config].arrangement);
  };

  return arrangement;
}

const paletteConfig = {};

paletteConfig.fields = generateFields(configs);
paletteConfig.arrangement = generateArrangements(configs);

module.exports = paletteConfig;
