const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 有順序性的
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello App',
      template: './src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css',
    }),
  ],
};
