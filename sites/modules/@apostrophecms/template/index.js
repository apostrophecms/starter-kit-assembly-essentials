module.exports = {
  init(self) {
    /**
     * Used in Nunjucks templates to determine if an
     * HTML attribute is a boolean attribute
     */
    self.addFilter({
      isBooleanAttr: self.isBooleanAttr
    });
  },
  methods(self) {
    return {
      isBooleanAttr(attribute) {
        const booleanAttributes = [
          'allowfullscreen',
          'async',
          'autofocus',
          'autoplay',
          'checked',
          'controls',
          'default',
          'defer',
          'disabled',
          'formnovalidate',
          'inert',
          'ismap',
          'itemscope',
          'loop',
          'multiple',
          'muted',
          'nomodule',
          'novalidate',
          'open',
          'playsinline',
          'readonly',
          'required',
          'reversed',
          'selected'
        ];

        return booleanAttributes.includes(attribute);
      }
    };
  },
  helpers(self, options) {
    return {
      /**
       * The link schema in `/lib/schema/link.js` allows
       * Editors to link to a Page, File, or custom url.
       * Used in Nunjucks templates to get the appropriate
       * field for the link's href based on the link type
       *
       * Example usage:
       * ```
       * apos.template.linkPath(item)
       * ```
       */

      linkPath: (link) => {
        if (!link) {
          return;
        }

        const path = {
          page: link?._linkPage[0]?._url,
          file: link?._linkFile[0]?._url,
          custom: link?.linkUrl
        };

        return path[link.linkType];
      }
    };
  }
};
