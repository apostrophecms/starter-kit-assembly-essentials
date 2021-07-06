const qs = require('qs');

module.exports = {
  fields: {
    add: {
      footer: {
        type: 'area',
        label: 'Footer',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-footer': {}
          }
        }
      },
      ...require('@apostrophecms-pro/basics/lib/navigation'),
      googleFontFamiliesInput: {
        type: 'string',
        label: 'Google Font Families',
        textarea: true,
        help: 'List font family names available from Google Fonts, one per line. These will become font choices in the palette.'
      }
    },
    group: {
      navigation: {
        label: 'Navigation',
        fields: [ 'navLogo', 'navLogoAlignment', 'navLinks' ]
      },
      footer: {
        label: 'Footer',
        fields: [ 'footer' ]
      },
      typography: {
        label: 'Typography',
        fields: [ 'googleFontFamiliesInput' ]
      }
    }
  },
  handlers(self, options) {
    return {
      beforeSave: {
        addFontFamilies(req, doc, options) {
          if (req.data.global) {
            // Allow legacy | syntax too
            doc.googleFontFamilies = (doc.googleFontFamiliesInput || '').split(/[|\r\n]+/).filter(family => family.length > 0);
            doc.googleFontFamiliesUrl = 'https://fonts.googleapis.com/css2?' + qs.stringify({
              family: req.data.global.googleFontFamilies,
              display: 'swap'
            }, {
              arrayFormat: 'repeat'
            });
            // The actual choices. Extensible, to allow for other font providers to be included
            doc.fontFamilies = [ ...doc.googleFontFamilies ];
          }
        }
      }
    };
  },
  extendMethods(self, options) {
    return {
      getBrowserData(_super, req) {
        const result = _super(req);
        result.fontFamilies = req.data.global.fontFamilies;
        return result;
      }
    };
  },
  init(self, options) {
    self.apos.schema.addFieldType({
      name: 'assemblyFontFamily',
      convert: async function (req, field, data, object) {
        const choices = (req.data.global.fontFamilies || []).map(family => {
          return {
            value: family,
            label: family
          };
        });
        object[field.name] = self.apos.launder.select(data[field.name], choices, field.def);
      },
      vueComponent: 'AssemblyInputFontFamily'
    });
  }
};
