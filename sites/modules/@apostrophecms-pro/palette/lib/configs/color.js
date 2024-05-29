module.exports = {
  add: {
    colorPrimary: {
      type: 'color',
      label: 'Primary Color',
      selector: ':root',
      property: '--palette-color-primary',
      def: '#6236ff'
    },
    colorSecondary: {
      type: 'color',
      label: 'Secondary Color',
      selector: ':root',
      property: '--palette-color-secondary',
      def: '#fe5599'
    },
    colorAccent: {
      type: 'color',
      label: 'Accent Color',
      selector: ':root',
      property: '--palette-color-accent',
      def: '#00cc88'
    },
    colorBackground: {
      type: 'color',
      label: 'Background Color',
      help: 'The background color of your website',
      selector: ':root',
      property: '--palette-color-background'
    }
  },
  group: {
    site: {
      label: 'Site Settings',
      fields: [
        'colorPrimary',
        'colorSecondary',
        'colorAccent',
        'colorBackground'
      ]
    }
  }
};
