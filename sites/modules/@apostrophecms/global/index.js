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
        htmlHelp: 'Google Fonts will provide several script tags for embedding your fonts, <a href="https://user-images.githubusercontent.com/30215449/105642337-2de3c680-5e57-11eb-8dd4-67e1f0e52a57.png" target="_blank">find the scripts here</a>. Paste them here.'
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
          if (!doc.googleFontScript && (!req.data.global || !req.data.global.googleFontScript)) {
            return;
          }
          try {
            const choices = [];
            let parsedQuery = null;
            // parse tag for quoted strings (attribute values)
            const quotedStrings = doc.googleFontScript.match(/"(\\.|[^"\\])*"/g) || [];
            quotedStrings.forEach(str => {
              // get just querystring portion of url
              const test = str.split('"').join('').split('?');
              // is a query string and has a 'family' property
              if (test.length > 1 && qs.parse(test[1]).family) {
                parsedQuery = qs.parse(test[1]);
              }
            });
            if (parsedQuery) {
              if (!Array.isArray(parsedQuery.family)) {
                // If there is only one family you do not get an array back
                // from the parser since google doesn't use explicit [] syntax
                parsedQuery.family = [ parsedQuery.family ];
              }
              parsedQuery.family.forEach(family => {
                const fontFamily = family.split(':')[0];
                const variantChoices = [];
                const variants = family.split('@')[1] ? family.split('@')[1].split(';') : [ '400' ];
                variants.forEach(font => {
                  const isItalic = font.split(',')[1] ? parseInt(font.split(',')[0]) === 1 : false;
                  const weight = font.split(',')[1] ? font.split(',')[1] : (font.split(',')[0] || '400');
                  variantChoices.push({
                    label: `${fontFamily} / ${isItalic ? 'Italic' : 'Normal'} / ${weight};`,
                    value: `${isItalic ? 'italic ' : ''}${weight} 14px ${fontFamily}`
                  });
                });
                choices.push(...variantChoices);
              });
              // Google is picky about encoding so don't nitpick, do it their way.
              // Just block anything that would escape from the quoted attribute
              doc.fontFamilyParameters = parsedQuery.family.map(family => {
                family = family.replace(/[">]/g, '');
                return `family=${family}`;
              }).join('&');
            } else if (doc.googleFontScript) {
              // has an entry but didn't parse to anything we can use
              self.apos.notify(req, 'Unable to parse Google Font Script. Double check your input', {
                type: 'danger',
                icon: 'alert-circle-icon'
              });
            }
            doc.fontFamilies = choices;
          } catch (error) {
            throw self.apos.error('invalid', 'That is not a valid google fonts embed code');
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
        const choices = req.data.global.fontFamilies || [];
        object[field.name] = self.apos.launder.select(data[field.name], choices, field.def);
      },
      vueComponent: 'AssemblyInputFontFamily'
    });
  }
};
