module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Brand',
    pluralLabel: 'Brands',
    alias: 'brand',
    localized: false
  },
  permissions(self) {
    return {
      add: {
        dashboardSiteView: {
          label: 'View Site in Dashboard',
          help: 'This refers to seeing the site listed in the dashboard for convenience.',
          perDoc: true
        },
        dashboardSiteCreate: {
          label: 'Create Site',
          perDoc: true
        },
        dashboardSiteEdit: {
          label: 'Modify Site Settings',
          help: 'This refers to the settings of the site within the dashboard.',
          perDoc: true
        },
      }
    }
  },
  init(self) {
    self.hideGroupPermissions();
  },
  handlers(self) {
    // TODO what if a user is removed from / added to a group etc. Should we make
    // brands stand in for groups here to simplify that
    return {
      beforeSave: {
        async updateBrandSites(req, brand) {
          const sites = await self.apos.site.find(req, {
            _brand: brand._id
          }).toArray();
          for (const site of sites) {
            if (brand.archived) {
              // If archiving a brand, archive the current sites too. Not necessarily
              // true in reverse.
              site.archived = true;
            }
            await self.apos.site.update(req, site, { refreshingBrand: true });
          }
        }
      },
    }
  },
  methods(self) {
    return {
      hideGroupPermissions() {
        // Group permissions on brands are not used, the replication rules become
        // very complex, use instead the user permissions of the brand as a simple
        // group equivalent
        const groupPermissions = self.schema.find(field => field.name === 'groupPermissions');
        groupPermissions.hidden = true;
      }
    }
  },
  queries(self, query) {
    return {
      builders: {
        oldBrand: {
          after(results) {
            for (const result of results) {
              // Make it visible for comparison
              result._oldBrandId = result._brand?.[0]?._id;
            }
            return results;
          }
        }
      }
    };
  }
};
