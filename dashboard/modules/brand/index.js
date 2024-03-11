module.exports = {
  options: {
    label: 'Brand',
    pluralLabel: 'Brands',
    alias: 'brand'
  },
  permissions(self) {
    return {
      add: {
        createSite: {
          label: 'Create Site'
        },
        editSiteSettings: {
          label: 'Modify Site Settings',
          help: 'This refers to the settings of the site within the dashboard.'
        },
        viewSite: {
          label: 'View Site in Dashboard',
          help: 'This refers to seeing the site listed in the dashboard for convenience.'
        }
      }
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        updateBrandSites(req, brand) {
          return self.updateBrandSites({
            brand
          });
        }
      },
      'site:beforeSave'(req, site) {
        updateBrandSites(req, site) {
          return self.updateBrandSites({
            site
          });
        }
      }
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
