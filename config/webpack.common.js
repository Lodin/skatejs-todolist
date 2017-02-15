const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: [
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   loader: 'tslint-loader',
      //   include: paths.appSrc,
      //   enforce: 'pre'
      // },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|webp|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    // new StyleLintPlugin({
    //   configFile: paths.appStylelintRc,
    //   syntax: 'scss',
    //   files: ['src/**/*.s?(a|c)ss']
    // })
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
