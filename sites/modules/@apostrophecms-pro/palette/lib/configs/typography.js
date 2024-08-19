/**
 * For additional information on using and configuring Palette, see:
 * https://github.com/apostrophecms/palette
 */

module.exports = {
  add: {
    titleFont: {
      label: 'Font Properties',
      type: 'assemblyFontFamily',
      help: 'Font properties for website headings',
      selector: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
      property: 'font-family'
    },
    buttonFont: {
      label: 'BUtton Font Properties',
      type: 'assemblyFontFamily',
      help: 'Font properties for buttons on the website',
      selector: [ '.button', '.navigation__link' ],
      property: 'font'
    },
    fontSize: {
      type: 'select',
      label: 'Font Size',
      help: 'Base font size for body text',
      selector: ':root',
      property: '--palette-font-size',
      unit: 'px',
      choices: [
        {
          label: '14px',
          value: '14'
        },
        {
          label: '16px',
          value: '16'
        },
        {
          label: '18px',
          value: '18'
        },
        {
          label: '96px',
          value: '96'
        }
      ],
      def: '16'
    },
    fontColor: {
      type: 'color',
      label: 'Font Color',
      help: 'Base font color for body text',
      selector: ':root',
      property: '--palette-font-color',
      def: '#333333'
    }
  },
  group: {
    typography: {
      label: 'Typography',
      fields: [
        'titleFont',
        'buttonFont',
        'fontSize',
        'fontColor'
      ]
    }
  }
};
