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
      choices: [
        {
          label: '12px',
          value: '12',
          def: true
        },
        {
          label: '15px',
          value: '15'
        }
      ]
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
      help: 'Base font family for the website',
      selector: 'h1',
      property: 'font-family'
    }
  },
  group: {
    page: {
      label: 'Page',
      fields: [ 'backgroundColor', 'primaryColor', 'secondaryColor' ]
    },
    typography: {
      label: 'Typography',
      fields: [],
      group: {
        default: {
          label: 'Default',
          fields: [ 'baseFont', 'baseFontSize', 'baseFontColor' ]
        },
        title: {
          label: 'Title',
          fields: [ 'titleFont' ]
        }
      }
    }
  }
};
