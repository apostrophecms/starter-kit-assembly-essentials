module.exports = {
  add: {
    gridMargin: {
      type: 'select',
      label: 'Margin',
      help: 'Space columns and widgets',
      selector: ':root',
      property: '--palette-grid-margin',
      unit: 'px',
      choices: [
        {
          label: '16px',
          value: '16'
        },
        {
          label: '20px',
          value: '20'
        },
        {
          label: '24px',
          value: '24'
        },
        {
          label: '28px',
          value: '28'
        },
        {
          label: '32px',
          value: '32'
        }
      ],
      def: '20'
    }
  },
  group: {
    grid: {
      label: 'Grid',
      fields: [
        'gridMargin'
      ]
    }
  }
};
