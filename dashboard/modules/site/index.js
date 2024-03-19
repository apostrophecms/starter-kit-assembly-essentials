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
  init(self) {
    self.hidePermissions();
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
        // Because per-doc view permissions don't exist in advanced permission yet
        viewers: {
          finalize() {
            if (query.get('permission').startsWith('view')) {
              if (!self.apos.permission.can(query.req, 'edit', 'brand')) {
                query.and({
                  viewerIds: req.user._id
                });
              }
            }
          }
        }
      }
    };
  },
  handlers(self, options) {
    return {
      afterSave: {
        async ensureCertificate(req, piece, options) {

          if (options.refreshingBrand) {
            // We're just refreshing permissions for a brand, don't make a lot of API calls
            return;
          }

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
  extendHandlers(self) {
    return {
      beforeSave: {
        async setPerDocumentPermissions(_super, req, site, options) {
          // Get the brand from the dynamic select field and override the
          // userPermissions and groupPermissions fields accordingly
          // before calling the superclass version
          const brand = await self.apos.brand.find(req, {
            _id: site.brand
          }, {
            permission: 'createSite'
          });
          if (!brand) {
            if (!self.apos.permission.can(req, 'edit', 'brand')) {
              throw self.apos.error('forbidden');
            }
            site._brand = [];
            site.userPermissions = [];
            site.groupPermissions = [];
          } else {
            site._brand = [ brand ];
            site.userPermissions = self.transformBrandPermissions(brand, 'user');
            site.groupPermissions = self.transformBrandPermissions(brand, 'group');
            site.viewerIds = [
              ...site.userPermissions.filter(({ view }) => view).map(({ _users }) => _users[0]._id),
              ...site.groupPermissions.filter(({ view }) => view).map(({ _groups }) => _groups[0]._id)
            ];
          }
          return _super(req, site, options);
        }
      }
    };
  },
  methods(self) {
    return {
      // Generate the dynamic select field choices according to the list of
      // brands that this user can actually create sites in
      async brandChoices(req) {
        const brands = await self.apos.brand.find(req, {}).permission('createSite');
        return brands.map(({ _id, title }) => ({
          value: _id,
          label: title
        }));
      },
      // For a given category (user or group), transform relevant permissions
      // of a brand (those starting with dashboardSite) into permissions of
      // an individual site in that brand by removing the dashboardSite prefix
      // and lowercasing the first character. This is used to override
      // userPermissions and groupPermissions
      transformBrandPermissions(brand, category) {
        const permissions = brand[`${category}Permissions`];
        const result = [];
        for (const permission of permissions) {
          const relevant = {};
          for (const name of Object.keys(permission)) {
            if (name.startsWith('dashboardSite')) {
              const temp = name.substring(name, 'dashboardSite'.length);
              const sitePermissionName = temp.substring(0, 1).toLowerCase() + temp.substring(1);
              relevant[sitePermissionName] = permission[name];
            }
          }
          if (relevant.length) {
            const principalKey = `_${category}s`;
            result.push({
              [principalKey]: permission[principalKey],
              ...relevant
            });
          }
        }
      },
      hidePermissions() {
        // See above for how these fields are overridden with brand permissions in practice
        const userPermissions = self.schema.find(field => field.name === 'userPermissions');
        userPermissions.hidden = true;
        const groupPermissions = self.schema.find(field => field.name === 'userPermissions');
        groupPermissions.hidden = true;
      }
    }
  }
};
