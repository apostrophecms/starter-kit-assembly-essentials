const config = {
  add: {
    footerBgColor: {
      label: 'Background Color',
      type: 'color',
      selector: '.c-footer',
      property: 'background-color'
    },
    footerTextColor: {
      label: 'Text Color',
      type: 'color',
      selector: '.c-footer',
      property: 'color'
    },
    footerAccentColor: {
      label: 'Accent Color',
      type: 'color',
      selector: '.c-footer__accent',
      property: 'color'
    },
    footerBubbleColor: {
      label: 'Icon Bubble Color',
      type: 'color',
      selector: '.c-footer__icon-wrapper',
      property: 'background-color'
    }
  },
  group: {
    footer: {
      label: 'Footer Settings',
      fields: [
        'footerBgColor',
        'footerTextColor',
        'footerAccentColor',
        'footerBubbleColor'
      ]
    }
  }
};

module.exports = config;
