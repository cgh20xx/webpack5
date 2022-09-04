# webpack5 筆記

## 安裝 webpack
```
npm i webpack -D
```

## 新增 webpack.config.js
https://webpack.js.org/
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

## package.json 新增 script 指令
webpack 會提示開發模式和生產模式需加上對應 --mode
```json
{
  "scripts": {
    "dev": "webpack serve --mode=development",
    "build": "webpack --mode=production"
  }
}

```

## 安裝及設定 devServer 
此為執行 webpack serve 依賴的套件

https://webpack.js.org/configuration/dev-server/

```
npm i webpack-dev-server -D
```

webpack.config.js
```js
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```
1. 設定開發伺服器的靜態資源目錄為 public 及 port 等相關資訊。
2. 在 public 手動新增 index.html 並加入 script src
3. 此路徑需和 webpack.config.js 裡的 output.filename 相同。
    ```html
    <script src="./bundle.js"></script>
    ```
## 安裝及設定 css-loader 和 style-loader
讓 webpack 可以讀取 css 檔案並插入到 html 裡

https://webpack.js.org/loaders/css-loader/#root

```
npm i css-loader style-loader -D
```

index.js
```js
import './css/index.css';
```

webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // 有順序性的
      },
    ],
  },
};
```

## 安裝及設定 html-webpack-plugin
此套件可讓 webpack 打包時，依照指定的 html 模版產生 html 檔，並且自動加入 hash 過的 js css 路徑。
https://webpack.js.org/plugins/html-webpack-plugin/#root

```
npm i html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  ...
  plugins: [new HtmlWebpackPlugin()],
};
```

HtmlWebpackPlugin 文件：https://github.com/jantimon/html-webpack-plugin#options
可以設定 title、template 等參數
```js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello App',
      template: './src/template.html'
    })
  ]
}
```

template.html 動態插入 title
```html
<title><%= htmlWebpackPlugin.options.title %></title>
```

## 安裝及設定 mini-css-extract-plugin
此套件可將 css 提取出來為獨立的 .css 檔案
文件：https://webpack.js.org/plugins/mini-css-extract-plugin/#root

安裝 mini-css-extract-plugin
```
npm i mini-css-extract-plugin -D
```

webpack.config.js
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```
- plugins 新增 new MiniCssExtractPlugin()
- 將原本的 style-loader 替換為 MiniCssExtractPlugin.loader

設定 Plugin Options
```js
new MiniCssExtractPlugin({
  filename: 'index.[contenthash].css',
}),
```

Webpack 的 hash 有三種：
1. hash：每次建構都會生成新的 hash。和整個專案有關，只要有文件更改就會改變 hash。
2. contenthash：和單文件內容有關。指定文件的內容發生改變，就會改變 hash。
3. chunkhash：和 webpack 打包生成的 chunk 相關。每一個 entry 都會有不同的 hash。


## 安裝及設定 Babel
babel 可將最新的 JS 語法轉為各瀏覽器都支持的舊語法，讓開發時可以使用最新的 JS 語法，不用擔心瀏覽器支援度問題
文件：https://babeljs.io/setup#installation

安裝 babel-loader 及 @babel/core 及 @babel/preset-env
```
npm i babel-loader @babel/core @babel/preset-env -D
```

設定 babel-loader 在 webpack.config.js
```js
{
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

建立 babel.config.json 然後貼上以下代碼
```json
{
  "presets": ["@babel/preset-env"]
}
```

