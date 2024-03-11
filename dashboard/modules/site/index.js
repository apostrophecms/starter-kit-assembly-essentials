const fs = require('fs');
const fetch = require('node-fetch');

const themes = require('../../../themes');

module.exports = {
  options: {
    baseUrlDomains: require('../../../domains.js'),
    localizedSites: true
  },
  fields: {
    add: {
      // This field is hidden and isalways overridden server side on save based on the UI field below
      _brand: {
        label: 'Brand',
        type: 'relationship',
        required: true,
        min: 1,
        max: 1,
        withType: 'brand',
        hidden: true
      },
      // Actual UI for selecting the above, with choices limited to those this user can pick
      brand: {
        label: 'brand',
        type: 'select',
        choices: 'brandChoices',
        required: true
      },
      logo: {
        label: 'Logo',
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/image': {
              aspectRatio: [ 1, 1 ],
              minSize: [ 500, 500 ],
              max: 1
            }
          },
          max: 1
        }
      },
      theme: {
        type: 'select',
        label: 'Theme',
        choices: themes,
        def: themes[0].value,
        required: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'brand',
          'title',
          'theme',
          'logo',
          'active',
          'shortName',
          'adminPassword'
        ]
      },
      production: {
        label: 'Production',
        fields: [
          'prodHostname',
          'canonicalize',
          'canonicalizeStatus'
        ]
      }
    }
  },
  tasks(self, options) {
    return {
      'list-themes': {
        usage: 'List the theme shortnames. Used by the cloud asset generation system.',
        async task(argv) {
          console.log(themes.map(theme => theme.value).join('\n'));
        }
      }
    };
  },
  queries(self, query) {
    return {
      builders: {
        viewers: {
          finalize() {
            if (query.get('permission').startsWith('view')) {
              query.and({
                viewerIds: req.user._id
              });
            }
          }
        },
        captureOldBrand: {
          after(results) {
            for (const result of results) {
              // So we can detect changes
              result._oldBrand = self.apos.util.clonePermanent(result._brand);
            }
          }
        }
      }
    };
  },
  handlers(self, options) {
    return {
      beforeSave: {
        async overrideBrandField(req, site) {
          const brand = await self.apos.brand.find(req, {
            _id: site.brand
          }, {
            permission: 'createSite'
          });
          if (!brand) {
            throw self.apos.error('forbidden');
          }
          site._brand = [ brand ];
        },
      }
      afterSave: {
        async brandMigration(req, site) {
          
        },
        async ensureCertificate(req, piece, options) {
          // Use the platform balancer API to immediately get a certificate for
          // the new site, so it can be accessed right away after creation.
          //
          // Sites created on a worker will be temporary and the worker won't
          // have the PB API key, so just make sure we have it first.

          if ((self.apos.options.multisite.activeEnv !== self.apos.options.multisite.debugEnv) && self.apos.baseUrl && fs.existsSync('/opt/cloud/platform-balancer-api-key')) {
            const key = fs.readFileSync('/opt/cloud/platform-balancer-api-key', 'utf8').trim();
            if (key.length) {
              const refreshUrl = self.apos.baseUrl + '/platform-balancer/refresh';
              const response = await fetch(refreshUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  // Since this key is visible to the Apostrophe application code in production,
                  // it is only capable of one thing: asking nicely that certificates be
                  // generated, if it's time and they are needed, for sites
                  // that are already in the system. Thus not a security risk
                  key
                })
              });
              if (response.status !== 200) {
                throw await response.text();
              }
            }
          }
        }
      }
    };
  },
  methods(self) {
    return {
      async brandChoices(req) {
        const brands = await self.apos.brand.find(req, {}).permission('createSite');
        return brands.map(({ _id, title }) => {
          value: _id,
          label: title
        });
      }
    }
  }
};
