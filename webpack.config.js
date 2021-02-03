const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

let theme = process.env.THEME;
const themes = require('./themes.js').map(theme => theme.value);

const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
const publicOutputPath = 'http://localhost:9002/wp/';

const dashboardConfig = {
  mode,
  // In production, always be IE11 compatible. In dev, be IE11 compatible
  // if IE11=1 is in the environment, as this currently breaks hot reload:
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: process.env.IE11 ? 'es5' : (mode === 'development') ? 'web' : 'es5',
  entry: [ `./dashboard/lib/modules/assets/src/js/index.js`, `./dashboard/lib/modules/assets/src/scss/index.scss` ],
  output: {
    ...((mode === 'development') ? {
      filename: 'dashboard.js',
      publicPath: publicOutputPath
    } : {
      path: path.resolve(
        __dirname, `dashboard/lib/modules/assets/public/js`
      ),
      filename: 'site.js'
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: (mode === 'development') ? 'dashboard.css' : '../css/site.css'
    })
  ],
  // Only the first devServer configuration is used per webpack docs, so we don't need
  // a separate one for the theme
  ...((mode === 'development') ? {
    devServer: {
      hot: true,
      inline: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      publicPath: '/wp/',
      port: 9002,
      allowedHosts: [
        '.localhost'
      ],
      proxy: {
        '/': 'http://localhost:3000'
      },
    }
  } : {}),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // Instead of style-loader, to avoid FOUC
          MiniCssExtractPlugin.loader,
          // Parses CSS imports
          'css-loader',
          // Parses SASS imports
          'sass-loader'
        ]
      }
    ]
  },
};

const themeConfigs = themes.map(name => {
  return {
    mode,
    // In production, always be IE11 compatible. In dev, be IE11 compatible
    // if IE11=1 is in the environment, as this currently breaks hot reload:
    // https://github.com/webpack/webpack-dev-server/issues/2758
    target: process.env.IE11 ? 'es5' : (mode === 'development') ? 'web' : 'es5',
    entry: [ `./sites/lib/modules/theme-${name}/src/js/index.js`, `./sites/lib/modules/theme-${name}/src/scss/index.scss` ],
    output: {
      ...((mode === 'development') ? {
        filename: `theme-${name}.js`,
        publicPath: publicOutputPath
      } : {
        path: path.resolve(
          __dirname, `sites/lib/modules/theme-${name}/public/js`
        ),
        filename: 'site.js'
      })
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: (mode === 'development') ? `theme-${name}.css` : `../css/site.css`
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            // Instead of style-loader, to avoid FOUC
            MiniCssExtractPlugin.loader,
            // Parses CSS imports
            'css-loader',
            // Parses SASS imports
            'sass-loader'
          ]
        }
      ]
    },
  };
});

module.exports = [ dashboardConfig, ...themeConfigs ];
