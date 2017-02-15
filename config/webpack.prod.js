const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const url = require('url');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const WebpackConfig = require('./webpack.common');

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}

const homepagePath = require(paths.appPackageJson).homepage;
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/';
const publicPath = ensureSlash(homepagePathname, true);
const publicUrl = ensureSlash(homepagePathname, false);
const env = getClientEnvironment(publicUrl);

WebpackConfig.bail = true;

WebpackConfig.devtool = 'source-map';

WebpackConfig.entry.unshift(require.resolve('./polyfills'));

WebpackConfig.output.filename = 'static/js/[name].[chunkhash:8].js';
WebpackConfig.output.chunkFilename = 'static/js/[name].[chunkhash:8].chunk.js';
WebpackConfig.output.publicPath = publicPath;

WebpackConfig.resolve.fallback = paths.nodePaths;

WebpackConfig.module.rules.push(
  {
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    loader: 'awesome-typescript-loader',
    options: {
      configFileName: paths.appTsconfig,
      jsx: 'Preserve',
      forkChecker: true,
      useBabel: true
    }
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          query: {
            importLoaders: 1,
            minimize: true
          }
        },
        {loader: 'postcss-loader'}
      ]
    }),
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          query: {
            importLoaders: 1,
            modules: true,
            camelCase: true,
            getIdentLocal: getIdentLocal
          }
        },
        {loader: 'postcss-loader'},
        {
          loader: 'sass-loader',
          query: {
            outputStyle: 'compressed'
          }
        }
      ]
    })
  }
);

WebpackConfig.plugins.push(
  new InterpolateHtmlPlugin({
    PUBLIC_URL: publicUrl
  }),
  new webpack.DefinePlugin(env),
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new LoaderOptionsPlugin({
    options: {
      postcss: [
        require('autoprefixer')(),
      ]
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  }),
  new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
  new ManifestPlugin({
    fileName: 'asset-manifest.json'
  })
);

module.exports = WebpackConfig;
