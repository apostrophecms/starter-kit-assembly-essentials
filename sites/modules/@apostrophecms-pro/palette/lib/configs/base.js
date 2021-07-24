const choices = require('../choices');

module.exports = {
  add: {
    backgroundColor: {
      label: 'Background color',
      type: 'color',
      help: 'The background of your website',
      selector: 'body',
      property: 'background-color',
      def: '#ffffff'
    },
    baseFont: {
      label: 'Font',
      type: 'assemblyFontFamily',
      help: 'Base font family for the website',
      selector: 'body',
      property: 'font-family'
    },
    baseFontSize: {
      label: 'Size',
      type: 'select',
      help: 'Base font size',
      selector: 'body',
      property: 'font-size',
      unit: 'px',
      choices: choices.BASE_SIZES
    },
    baseFontColor: {
      label: 'Color',
      type: 'color',
      selector: 'body',
      property: 'color',
      def: '#000000'
    },
    titleFont: {
      label: 'Font',
      type: 'assemblyFontFamily',
      help: 'Font family for website headings',
      selector: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
      property: 'font-family'
    },
    linkColor: {
      label: 'Link color',
      type: 'color',
      help: 'Default text link color',
      // TODO: Update rich text data attribute to a class when RTE className
      // bug is fixed.
      selector: [ '[data-rich-text] a', '.navigation__link' ],
      property: 'color',
      def: 'royalblue'
    }
  },
  group: {
    page: {
      label: 'Page',
      fields: [
        'backgroundColor',
        'primaryColor',
        'secondaryColor'
      ]
    },
    typography: {
      label: 'Typography',
      fields: [],
      group: {
        default: {
          label: 'Default',
          fields: [
            'baseFont',
            'baseFontSize',
            'baseFontColor'
          ]
        },
        title: {
          label: 'Title',
          fields: [
            'titleFont'
          ]
        }
      }
    }
  }
};
