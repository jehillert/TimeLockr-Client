const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './client/index.jsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader/locals', 'less-loader'] },
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.EnvironmentPlugin({ API_HOST: 'http://localhost:3000' }),
  ],
  devServer: { contentBase: './dist' },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'client/indexes/components.jsx'),
      contexts: path.resolve(__dirname, 'client/indexes/contexts.jsx'),
      theme: path.resolve(__dirname, 'client/indexes/theme.jsx'),
      utilities: path.resolve(__dirname, 'client/indexes/utilities.jsx'),
    },
  },
};


