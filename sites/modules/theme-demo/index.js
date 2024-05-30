/**
 * For ease of migration to Assembly later, we've organized
 * the styles and site-specific JavaScript in this theme module.
 */

const path = require('path');

const themeDir = path.resolve(process.cwd(), __dirname);

module.exports = {
  options: {
    alias: 'theme'
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
@import "${themeDir}/ui/src/scss/settings/_color";
@import "${themeDir}/ui/src/scss/settings/_font";
@import "${themeDir}/ui/src/scss/functions/_rem";
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
