
module.exports = {
  add: {
    backgroundColor: {
      label: 'Site Background Color',
      type: 'color',
      selector: 'body',
      property: 'background-color',
      def: '#ffffff'
    },
    accentColor: {
      label: 'Accent Color',
      type: 'color',
      help: 'The accent color of links and headers around the site',
      selector: ':root',
      property: '--accent-color',
      def: '#ffffff'
    },
    accentColorContrast: {
      label: 'Accent Color Contrast',
      type: 'color',
      help: 'This color is used to style text inside accented headers and buttons',
      selector: ':root',
      property: '--accent-color-contrast',
      def: '#ffffff'
    }
  },
  group: {
    site: {
      label: 'Site Settings',
      fields: [
        'backgroundColor',
        'accentColor',
        'accentColorContrast'
      ]
    }
  }
};
