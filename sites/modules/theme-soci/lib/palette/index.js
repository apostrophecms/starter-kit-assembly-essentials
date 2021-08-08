const palette = require('../../../@apostrophecms-pro/palette');
const path = require('path');
const configs = require('require-all')({
  dirname: path.join(
    __dirname, 'configs'
  )
});

delete palette.fields.add.footerBgColor;
delete palette.fields.add.footerTextColor;
delete palette.fields.add.footerLinkColor;
delete palette.fields.add.footerPadding;

delete palette.options.paletteGroups.footer;

palette.fields.add = {
  ...palette.fields.add,
  ...generateFields(configs)
};

function generateFields (configs) {
  let fields = {};
  for (const config of Object.keys(configs)) {
    fields = {
      ...fields,
      ...configs[config].add
    };
  };

  return fields;
}

function generateGroups (configs) {
  let groups = {};

  for (const config of Object.keys(configs)) {
    groups = {
      ...groups,
      ...configs[config].group
    };
  };

  return groups;
}

// const fields = generateFields(configs);
// const groups = generateGroups(configs);

module.exports = palette;
