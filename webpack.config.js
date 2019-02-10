'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/app/app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js',
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  resolve: {
    modulesDirectories: ['node_modules', 'src/'],
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file',
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: /index\.html/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Client Coding Exercise',
      template: './src/index.html',
      inject: 'body',
    }),
  ].concat(
    isProd
      ? [
          new webpack.NoErrorsPlugin(),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin(),
          new CopyWebpackPlugin(
            [
              {
                from: path.resolve(__dirname, './src'),
              },
            ],
            { ignore: ['*.html'] }
          ),
        ]
      : []
  ),
  devServer: {
    contentBase: './src',
    stats: 'minimal',
  },
}
