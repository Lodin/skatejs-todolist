const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const WebpackConfig = require('./webpack.common');

const publicPath = '/';
const publicUrl = '';

module.exports = Object.assign({}, WebpackConfig, {
  devtool: 'inline-source-maps',
  entry: [paths.appTests],
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
        loader: 'tslint-loader',
        include: paths.appSrc,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(js|ts|tsx)$/, loader: 'sourcemap-istanbul-instrumenter-loader',
        enforce: 'post',
        exclude: [
          /\.spec\.(ts|tsx)$/,
          /node_modules/
        ],
        options: {'force-sourcemap': true}
      },
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: paths.appTsconfig,
          forkChecker: true,
          module: 'commonjs'
        }
      }
    ]
  },
  plugins: [
    ...WebpackConfig.plugins,
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new webpack.DefinePlugin(env),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.IgnorePlugin(
      /\.(s?css|json|eot|otf|ttf|woff2?|ico|jpe?g|png|gif|webp|svg|mp[3|4]|webm|wav|m4a|aac|oga)/
    ),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|tsx|js)($|\?)/i // process .js and .ts files only
    })
  ],
  externals: {
    'react/addons': 'window',
    'react/lib/ExecutionEnvironment': 'window',
    'react/lib/ReactContext': 'window'
  }
});
