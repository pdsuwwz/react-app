const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TEM_PATH = './templates';
const config = require('../src/common/config.js');
const mainVendor = require('../vendor/dll/vendor-manifest.json');
const bundleConfig = require("../bundle-config.json")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  performance: {
    hints: false
  },
  entry: {
    bundle: ['@babel/polyfill', './src/script/app.js'],
  },
  output: {
    path: resolve('public'),
    filename: "bundle.js",
  },
  devtool: 'inline',
  devServer: {
    contentBase: [resolve('public'), resolve('vendor')], // 配置多个数据源
    inline: false, // 取消热更新，并且浏览器控制台不产生构建消息
    host: '127.0.0.1',
    port: config.port,
    disableHostCheck: true
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.scss/,
      use: [MiniCssExtractPlugin.loader, "css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]", {
        loader: 'postcss-loader',
        options: { ident: 'postcss', sourceMap: true, config: { path: resolve('postcss.config.js') } },
      }, "sass-loader"],
      exclude: resolve('node_modules'),
      include: resolve('src')
    }, {
      test: /\.css/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.png|jpg|jpeg|bmp|gif|ttf|woff|woff2|eot|svg$/,
      use: "file-loader?limit=8192&name=[path][name].[ext]"
    }]
  },

  plugins: [
    // 部分插件默认已经支持，无需再次配置，详见文档 https://webpack.js.org/migrate/4/#deprecated-removed-plugins
    new HtmlwebpackPlugin({
      title: 'My first react app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      // // 加载dll文件
      vendorJsName: bundleConfig.vendor.js
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: mainVendor
    }),
  ],
  resolve: {
    // 用于配置可解析的后缀名，其中缺省为 js 和 json
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '#': resolve('src'), // 为项目根目录中 src 目录配置别名 #
    }
  }
};
