module.exports = {
  fields: {
    add: {
      footer: {
        type: 'area',
        label: 'Footer',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-footer': {}
          }
        }
      },
      ...require('@apostrophecms-pro/basics/lib/navigation')
    },
    group: {
      navigation: {
        label: 'Navigation',
        fields: [ 'navLogo', 'navLogoAlignment', 'navLinks' ]
      },
      footer: {
        label: 'Footer',
        fields: ['footer']
      }
    }    
  }
};
