const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const config = require('../src/common/config.js');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js')
const bundleConfig = require("../bundle-config.json")
const TEM_PATH = './templates';
const resolve = (dir) => path.join(__dirname, '..', dir)

const optimization = {
  splitChunks: {
    cacheGroups: {
      common: {
        test: /[\\/]node_modules[\\/]/,
        minSize: 30000,
        maxSize: 512000,
        minChunks: 2,
        chunks: 'all',
        priority: 1
      },
    },
  },
  minimizer: [new TerserWebpackPlugin({
    sourceMap: false,
    parallel: true,
    terserOptions: {
      keep_fnames: true,
    },
  })],
};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlwebpackPlugin({
    title: 'My first react app',
    template: path.resolve(TEM_PATH, 'index.html'),
    filename: 'index.html',
    // // 加载dll文件
    vendorJsName: bundleConfig.vendor.js,
    inject: true,
  }),
];

module.exports = merge(baseConfig, {
  mode: 'development',
  optimization,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [resolve('public'), resolve('vendor')], // 配置多个数据源
    inline: true,
    host: '127.0.0.1',
    port: config.port,
    disableHostCheck: true,
    quiet: true, // 使用 FriendlyErrorsWebpackPlugin ，可设置此选项来关闭控制台不必要的信息
  },
  resolve: {
    // 用于配置可解析的后缀名，其中缺省为 js 和 json
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '#': resolve('src'), // 为项目根目录中 src 目录配置别名 #
    }
  },
  plugins
});
