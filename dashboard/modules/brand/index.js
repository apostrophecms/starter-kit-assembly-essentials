module.exports = {
  options: {
    label: 'Brand',
    pluralLabel: 'Brands',
    alias: 'brand',
    localized: false
  },
  permissions(self) {
    return {
      add: {
        createSite: {
          label: 'Create Site'
        },
        dashboardSiteEdit: {
          label: 'Modify Site Settings',
          help: 'This refers to the settings of the site within the dashboard.'
        },
        dashboardSiteView: {
          label: 'View Site in Dashboard',
          help: 'This refers to seeing the site listed in the dashboard for convenience.'
        }
      }
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        async updateBrandSites(req, brand) {
          const sites = await self.apos.site.find(req, {
            _brand: brand._id
          });
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
      // Update the permissions of sites based on their current relationships to
      // brands. For performance, either `site` or `brand` must be specified to limit
      // the scope.
      async updateBrandSites({ brand = null, site = null } = {}) {
        if (!(brand || site)) {
          throw self.apos.error('invalid', 'Either brand or site must be specified in updateBrandSites');
        }
        // TODO:
        // populate viewerIds, since there is no native per-doc view permission yet
        // copy custom permissions
      }
    }
  }
};
