module.exports = {
  tasks(self) {
    return {
      list: {
        usage: 'List sites with their databases: node app sites:list --dashboard',
        task: async (argv) => {
          const sites = await self.apos.doc.db.find({
            type: 'site',
            temporary: { $ne: true }
          }).project({
            _id: 1,
            title: 1,
            shortName: 1,
            theme: 1
          }).toArray();
          const result = sites.map(site => {
            return {
              title: site.title,
              theme: site.theme,
              db: `${self.apos.shortName.replace('-dashboard', '')}-${site._id}`
            };
          });
          console.log('Dashboard: ', {
            title: 'Dashboard',
            db: self.apos.shortName
          });
          console.log('Sites:', result);
        }
      }
    };
  }
};
