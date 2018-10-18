const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '../public', dir)
}

module.exports = {
  mode : 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom']  //提取公共模块
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