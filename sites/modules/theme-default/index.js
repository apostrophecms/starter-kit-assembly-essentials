/**
 * This is a good place to add theme specific
 * variations on helpers; since the active theme
 * is aliased as `apos.theme` these can be called easily
 */

module.exports = {
  options: {
    alias: 'theme',
    // Silence startup warning about the lack of code since this
    // is just an empty starting point for your own work
    ignoreNoCodeWarning: true,
    // Silence startup warning displayed if this module is
    // not activated at all, since only one theme module
    // will be activated per site
    ignoreUnusedFolderWarning: true
  },
  /**
   * Update the webpack config so we can use SCSS variables and
   * utilities from our theme in widgets
   */
  webpack: {
    extensions: {
      themeVariables: {
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/,
              use: [
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: false,
                    additionalData: `
@use 'sass:math';

// The code below is used by the Widgets included in the Starter Kit
// You'll need to keep these so the theme builds or refactor the 
// included widgets to remove these variables and functions.

$color-light-yellow: #ffffd8;

$color-white: #fff;
$color-gray-05: #eee;
$color-gray-15: #dbdbdb;
$color-gray-80: #2b2b2b;
$color-black: #000;

$font-monospace: menlo, monaco, consolas, 'Liberation Mono', 'Courier New', monospace;
$font-sans-serif: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, helvetica, arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

$font-weight-light: 200;
$font-weight-normal: 400;
$font-weight-bold: 700;

// Converts a px font size to rem unit
// stylelint-disable-next-line at-rule-disallowed-list
@function rem($value) {
  @return math.div($value, 16) + rem;
}
`
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }
};
