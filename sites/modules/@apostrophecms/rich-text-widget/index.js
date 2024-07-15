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
        'color'
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
  }
};
