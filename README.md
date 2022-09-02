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
