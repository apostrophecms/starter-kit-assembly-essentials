const fs = require('fs');
const fetch = require('node-fetch');

const themes = require('../../../themes');

module.exports = {
  options: {
    baseUrlDomains: require('../../../domains.js'),
    localizedSites: true
  },
  permissions: {
    add: {
      // Copied over automatically from siteDashboardView in brand
      view: {
        label: 'View',
        perDoc: true
      }
    }
  },
  fields: {
    add: {
      // This field is hidden and is always overridden server side on save based on the UI field below
      _brand: {
        type: 'relationship',
        withType: 'brand',
        hidden: true
      },
      // Actual UI for selecting the above, with choices limited to those this user can pick
      brand: {
        label: 'Brand',
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
          // Group the hidden fields here so they don't create empty groups
          '_brand',
          'userPermissions',
          'groupPermissions',
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
            try {
              const req = query.req;
              const permission = query.get('permission') || 'view';
              if (permission.startsWith('view')) {
                if (!self.apos.permission.can(req, 'edit', 'brand')) {
                  if (req.user) {
                    query.and({
                      viewerIds: req.user._id
                    });
                  } else {
                    query.and({
                      _id: '__iNeverMatch'
                    });
                  }
                }
              }
            } catch (e) {
              console.error(e);
              throw e;
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
            permission: 'dashboardSiteCreate'
          }).toObject();
          // Brands stand in for groups here (Alex was right)
          site.groupPermissions = [];
          if (!brand) {
            console.log('no brand');
            if (!self.apos.permission.can(req, 'edit', 'brand')) {
              throw self.apos.error('forbidden');
            }
            site._brand = [];
            site.userPermissions = [];
            site.viewerIds = [];
          } else {
            console.log('has brand');
            site._brand = [ brand ];
            site.userPermissions = self.transformBrandPermissions(brand, 'user');
            site.viewerIds = site.userPermissions.filter(({ view }) => view).map(({ _users }) => _users[0]._id);
            console.log('viewer ids:', site.viewerIds);
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
        const brands = await self.apos.brand.find(req, {}).permission('dashboardSiteCreate').toArray();
        return brands.map(({ _id, title }) => ({
          value: _id,
          label: title
        }));
      },
      // For a given category (e.g. "user"), transform relevant permissions
      // of a brand (those starting with dashboardSite) into permissions of
      // an individual site in that brand by removing the dashboardSite prefix
      // and lowercasing the first character. This is used to override
      // userPermissions. For now brand per-user permissions seem to be a good substitute
      // for groups and simplify a lot of lifecycle handling, so we only call this for users
      // at the moment, but that could change
      transformBrandPermissions(brand, category) {
        console.log(brand);
        const permissions = brand[`${category}Permissions`];
        const result = [];
        for (const permission of permissions) {
          const relevant = {};
          for (const name of Object.keys(permission)) {
            if (name.startsWith('dashboardSite')) {
              const temp = name.substring('dashboardSite'.length);
              const sitePermissionName = temp.substring(0, 1).toLowerCase() + temp.substring(1);
              relevant[sitePermissionName] = permission[name];
            }
          }
          if (Object.keys(relevant).length) {
            const principalKey = `_${category}s`;
            const idsKey = `${category}sIds`;
            result.push({
              [principalKey]: permission[principalKey],
              [idsKey]: permission[idsKey],
              ...relevant
            });
          }
          console.log('relevant is:', relevant);
        }
        return result;
      },
      hidePermissions() {
        // See above for how these fields are overridden with brand permissions in practice
        const userPermissions = self.schema.find(field => field.name === 'userPermissions');
        userPermissions.hidden = true;
        const groupPermissions = self.schema.find(field => field.name === 'groupPermissions');
        groupPermissions.hidden = true;
      }
    }
  }
};
