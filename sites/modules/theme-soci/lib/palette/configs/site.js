
module.exports = {
  add: {
    backgroundColor: {
      label: 'Accent Color',
      type: 'color',
      help: 'The Accent color of links',
      selector: ':root',
      property: '--accent-color',
      def: '#ffffff'
    }
  }
  // group: {
  //   page: {
  //     label: 'Page',
  //     fields: [
  //       'backgroundColor',
  //       'primaryColor',
  //       'secondaryColor'
  //     ]
  //   },
  //   typography: {
  //     label: 'Typography',
  //     fields: [],
  //     group: {
  //       default: {
  //         label: 'Default',
  //         fields: [
  //           'baseFont',
  //           'baseFontSize',
  //           'baseFontColor'
  //         ]
  //       },
  //       title: {
  //         label: 'Title',
  //         fields: [
  //           'titleFont'
  //         ]
  //       }
  //     }
  //   }
  // }
};
