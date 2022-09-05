const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // entry: './src/index.js', // 預設 entry name 為 main
  entry: {
    app: './src/index.js', // 設置 entry name 為 app
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js', // 基本設置
    filename: '[name].[chunkhash].bundle.js', // 進階設置
    clean: true, // 在生成文件之前清空 output 目錄。
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
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset', // 還有其它三種 type
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello App',
      template: './src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
