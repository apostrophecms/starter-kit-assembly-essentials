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
      }
    },
    group: {
      footer: {
        label: 'Footer',
        fields: ['footer']
      }
    }
  }
}