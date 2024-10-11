/**
 * A Minimally Styled theme that showcases core Apostrophe functionality
 */

import path from 'node:path';
import url from 'node:url';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const themeDir = path.resolve(process.cwd(), dirname);

export default {
  options: {
    alias: 'theme'
  },
  /**
   * Updates the webpack config so we can use SCSS variables and
   * utilities from our theme in shared widgets
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
