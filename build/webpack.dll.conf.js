const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'prop-types']  //提取公共模块
  },
  output: {
    path: path.join(__dirname, '../vendor', 'dll'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../vendor/dll', '[name]-manifest.json'),
      name: '[name]_[chunkhash]_library',
      // context: __dirname
      //这里加入上下文会导致打包文件大小变为原来的二倍，原因暂未发现
    }),
    // 把带hash的dll插入到html中
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
};