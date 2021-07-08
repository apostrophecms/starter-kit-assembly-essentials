module.exports = {
  add: {
    buttonColor: {
      label: 'Text color',
      type: 'color',
      selector: '.button__link',
      property: 'color',
      def: '#000'
    },
    buttonBackgroundColor: {
      label: 'Background color',
      type: 'color',
      selector: '.button__link',
      property: 'background-color',
      def: '#fff'
    },
    buttonBorderColor: {
      label: 'Border color',
      type: 'color',
      selector: '.button__link',
      property: 'border-color',
      def: '#000'
    }
    // heroContentWidth: {
    //   unit: '%',
    //   type: 'range',
    //   label: 'Hero content width',
    //   help: 'Select the percentage width the hero content should take up. On small screens it will go full width.',
    //   min: 30,
    //   max: 100,
    //   def: 50,
    //   selector: '.hero-widget__content > .apos-area',
    //   property: 'width',
    //   mediaQuery: '(min-width: 640px)'
    // }
  },
  group: {
    other: {
      label: 'Other styles',
      fields: [],
      group: {
        buttons: {
          label: 'Button links',
          fields: [
            'buttonColor',
            'buttonBackgroundColor',
            'buttonBorderColor'
          ]
        }
        // hero: {
        //   label: 'Hero widgets',
        //   fields: [
        //     'heroContentWidth'
        //   ]
        // }
        // title: {
        //   label: 'Title',
        //   fields: [ 'titleFont' ]
        // }
      }
    }
  }
};
