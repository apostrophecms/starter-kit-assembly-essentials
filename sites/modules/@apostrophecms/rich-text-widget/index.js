module.exports = {
  options: {
    className: 'text-widget',
    defaultOptions: {
      toolbar: [
        'styles',
        '|',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'alignLeft',
        'alignCenter',
        'alignRight',
        'bulletList',
        'orderedList',
        '|',
        'blockquote',
        'image',
        '|',
        'colorButton'
      ],
      insert: [ 'image', 'horizontalRule' ],
      styles: [
        {
          tag: 'h1',
          label: 'Heading 1 (H1)'
        },
        {
          tag: 'h2',
          label: 'Heading 2 (H2)'
        },
        {
          tag: 'h3',
          label: 'Heading 3 (H3)'
        },
        {
          tag: 'h4',
          label: 'Heading 4 (H4)'
        },
        {
          tag: 'p',
          label: 'Paragraph (P)'
        }
      ]
    }
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);

        const finalTools = {
          ...initialData.tools,
          colorButton: {
            component: 'ColorButton',
            label: 'Color',
            command: 'setColor'
          }
        };

        const finalData = {
          ...initialData,
          tools: finalTools,
          aposColorConfig: self.options.colors
        };

        return finalData;
      },
      optionsToSanitizeHtml(_super, options) {
        const superResult = _super(options);

        if (!superResult.allowedTags.includes('span')) {
          superResult.allowedTags.push('span');
          superResult.allowedStyles.span = {};
        }

        superResult.allowedStyles.span.color = [ /^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/ ];

        if (!superResult.allowedAttributes.span) {
          superResult.allowedAttributes.span = [];
        }

        superResult.allowedAttributes.span.push('style');

        return superResult;
      }
    };
  }
};
