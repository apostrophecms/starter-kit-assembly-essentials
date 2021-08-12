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
      label: 'Font Properties',
      type: 'assemblyFontFamily',
      help: 'Base font properties for the website',
      selector: 'body',
      property: 'font'
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
    titleFontColor: {
      label: 'Color',
      type: 'color',
      selector: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
      property: 'color',
      def: '#000000'
    },
    titleFont: {
      label: 'Font Properties',
      type: 'assemblyFontFamily',
      help: 'Font properties for website headings',
      selector: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
      property: 'font'
    },
    buttonFont: {
      label: 'Font Properties',
      type: 'assemblyFontFamily',
      help: 'Font properties for buttons on the website',
      selector: [ '.button', '.navigation__link' ],
      property: 'font'
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
            'titleFont',
            'titleFontColor'
          ]
        },
        button: {
          label: 'Buttons',
          fields: [
            'buttonFont'
          ]
        }
      }
    }
  }
};
