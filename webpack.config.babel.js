import { resolve } from 'path'
import { optimize, NoErrorsPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'

export default {
  entry: {
    app: './src/app/app.js',
  },
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: `[name].${isProd ? '[hash]' : 'bundle'}.js`,
    chunkFilename: `[name].${isProd ? '[hash]' : 'bundle'}.js`,
  },
  devtool: `${isProd ? '' : 'eval-'}source-map`,
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
          new NoErrorsPlugin(),
          new optimize.DedupePlugin(),
          new optimize.UglifyJsPlugin(),
          new CopyWebpackPlugin(
            [
              {
                from: resolve(__dirname, './src'),
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
