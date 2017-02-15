const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require('./paths');
const WebpackConfig = require('./webpack.common');

const publicPath = '/';

module.exports = Object.assign({}, WebpackConfig, {
  devtool: 'eval',
  output: Object.assign({}, WebpackConfig.output, {
    filename: 'static/js/[name].[hash:8].js',
    pathinfo: true,
    publicPath
  }),
  module: {
    rules: [
      ...WebpackConfig.module.rules,
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: paths.appTsconfig,
          forkChecker: true
        }
      },
      {
        test: /\.js/,
        include: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'wc-loader',
        include: [
          /bower_components/
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'to-string-loader'},
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1,
              minimize: true
            }
          }
        ]
      }
      // {
      //   test: /\.scss/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //         camelCase: true,
      //         localIdentName: '[name]__[local]'
      //       }
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         outputStyle: 'compressed',
      //         sourcemap: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    ...WebpackConfig.plugins,
    new HtmlWebpackPlugin({
      inject: 'head',
      template: paths.appHtml,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
  ]
});
