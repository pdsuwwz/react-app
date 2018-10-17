const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '../public', dir)
}

module.exports = {
  mode : 'production',
  entry: {
    bundle: ['react', 'react-dom', 'react-router-dom']  //提取公共模块
  },
  output: {
    path: path.join(__dirname, '../public', 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public/dll', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};