export default {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  },
  async init(self) {
    self.removeDuplicateParkedPagesMigration();
  },
  methods(self) {
    return {
      removeDuplicateParkedPagesMigration() {
        self.apos.migration.add(
          'remove-duplicate-parked-pages',
          async () => {
            const duplicateParkedPages = await self.apos.doc.db
              .find(
                {
                  parkedId: 'home',
                  rank: { $ne: 0 },
                  level: { $ne: 0 },
                  slug: { $ne: '/' }
                }
              )
              .toArray();
            if (duplicateParkedPages.length === 0) {
              return;
            }

            for (const duplicate of duplicateParkedPages) {
              await self.apos.doc.db.updateOne(
                {
                  _id: duplicate._id
                },
                {
                  $unset: {
                    parkedId: '',
                    parked: ''
                  }
                }
              );
            }
        });
      }
    };
  },
  handlers(self, options) {
    return {
      '@apostrophecms/page:beforeSend': {
        setTheme(req) {
          req.data.theme = self.apos.options.theme;
        }
      }
    };
  }
};
