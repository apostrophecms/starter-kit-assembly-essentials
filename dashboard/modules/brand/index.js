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
  async init(self) {
    self.hideGroupPermissions();
    await self.insertSiteCreatorsGroup();
  },
  handlers(self) {
    return {
      beforeSave: {
        async updateBrandSites(req, brand) {
          const sites = await self.apos.site.find(req, {
            _brand: brand._id
          }).permission(false).toArray();
          for (const site of sites) {
            if (brand.archived) {
              // If archiving a brand, archive the current sites too. Not necessarily
              // true in reverse.
              site.archived = true;
            }
            await self.apos.site.update(req, site, { refreshingBrand: true, permissions: false });
          }
        }
      },
      afterSave: {
        async updateSiteCreatorsGroup(req) {
          const brands = await self.find(req).permission(false).toArray();
          const usersIds = [];
          for (const brand of brands) {
            const { userPermissions } = brand;
            for (const userPermission of userPermissions) {
              const id = userPermission?.usersIds?.[0];
              if (id && userPermission.dashboardSiteCreate) {
                usersIds.push(id);
              }
            }
          }
          let group = (await self.apos.doc.db.findOne({
            type: '@apostrophecms-pro/advanced-permission-group',
            siteCreators: true,
            archived: false
          })) || await self.insertSiteCreatorsGroup();
          await self.apos.doc.db.updateMany({
            type: '@apostrophecms/user',
            _id: {
              $nin: usersIds
            }
          }, {
            $pull: {
              groupsIds: group._id
            }
          });
          await self.apos.doc.db.updateMany({
            type: '@apostrophecms/user',
            _id: {
              $in: usersIds
            }
          }, {
            $addToSet: {
              groupsIds: group._id
            }
          });
        }
      }
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
      },
      async insertSiteCreatorsGroup() {
        const req = self.apos.task.getReq();
        const groupModule = self.apos.modules['@apostrophecms-pro/advanced-permission-group'];
        const siteCreatorsGroup = await groupModule.find(req, {
          siteCreators: true
        }).toObject();
        if (!siteCreatorsGroup) {
          return groupModule.insert(req, {
            title: 'Site Creators Via Brands (do not edit)',
            siteCreators: true,
            permissionsByType: [
              {
                type: 'site',
                permissions: [
                  'create'
                ]
              }
            ]
          });
        }
      }
    }
  }
};
