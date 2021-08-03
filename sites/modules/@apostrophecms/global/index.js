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
      googleFontScript: {
        type: 'string',
        label: 'Google Font Script',
        textarea: true,
        help: 'Google Fonts will provide a script tag for including your fonts. Paste it here'
      }
    },
    group: {
      typography: {
        label: 'Typography',
        fields: [ 'googleFontScript' ]
      },
      navigation: {
        label: 'Navigation',
        fields: [ 'navLogo', 'navLogoAlignment', 'navLinks' ]
      },
      footer: {
        label: 'Footer',
        fields: [ 'footer' ]
      }
    }
  },
  handlers(self, options) {
    return {
      beforeSave: {
        addFontFamilies(req, doc, options) {
          if (req.data.global) {
            const choices = [];
            let query;
            // parse tag for quoted strings (attribute values)
            const values = doc.googleFontScript.match(/"(\\.|[^"\\])*"/g);
            values.forEach(str => {
              // remove quotes and return the query string portion of the url
              const qs = str.split('"').join('').split('?');
              if (qs.length > 1) {
                // has a query string, make sure it has a 'family' param
                query = queryStringToJSON(qs[1]).family ? queryStringToJSON(qs[1]) : null;
              }
            });
            if (query) {
              query.family.forEach(family => {
                const fontFamily = family.split(':')[0].split('+').join(' ');
                const variantChoices = [];
                const variants = family.split('@')[1] ? family.split('@')[1].split(';') : [ '400' ];
                variants.forEach(font => {
                  const isItalic = font.split(',')[1] ? parseInt(font.split(',')[0]) === 1 : false;
                  const weight = font.split(',')[1] ? font.split(',')[1] : (font.split(',')[0] || '400');
                  variantChoices.push({
                    label: `${fontFamily}; ${weight}; ${isItalic ? 'Italic' : ''}`,
                    value: `${isItalic ? 'italic ' : ''}${weight} 14px ${fontFamily}`
                  });
                });
                choices.push(...variantChoices);
              });
            }
            doc.fontFamilies = choices;
          }
          // https://stackoverflow.com/a/32204670/7998226
          function queryStringToJSON(qs) {
            var pairs = qs.split('&');
            var result = {};
            pairs.forEach(function(p) {
              var pair = p.split('=');
              var key = pair[0];
              var value = decodeURIComponent(pair[1] || '');
              if (result[key]) {
                if (Object.prototype.toString.call(result[key]) === '[object Array]') {
                  result[key].push(value);
                } else {
                  result[key] = [ result[key], value ];
                }
              } else {
                result[key] = value;
              }
            });
            return JSON.parse(JSON.stringify(result));
          };
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
        const choices = req.data.global.fontFamilies || [];
        object[field.name] = self.apos.launder.select(data[field.name], choices, field.def);
      },
      vueComponent: 'AssemblyInputFontFamily'
    });
  }
};
