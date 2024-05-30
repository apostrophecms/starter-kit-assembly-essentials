module.exports = {
  add: {
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
        'fontSize',
        'fontColor'
      ]
    }
  }
};
