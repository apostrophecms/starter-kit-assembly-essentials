module.exports = {
  fields: {
    add: {
      ...require('@apostrophecms-pro/basics/lib/navigation')
    },
    group: {
      navigation: {
        label: 'Navigation',
        fields: [ 'navLogo', 'navLogoAlignment', 'navLinks' ]
      }
    }    
  }
};
