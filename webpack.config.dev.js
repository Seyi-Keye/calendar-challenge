const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client', './src/client/index.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Loads the javascript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /(\.scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, use: 'url?prefix=font/&limit=5000' },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml',
      },
      { test: /\.(png|jpg|gif|svg|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ]
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: './src/client/index.html',
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new ESLintPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
