const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const mainVendor = require('../vendor/dll/vendor-manifest.json');
const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    bundle: ['@babel/polyfill', './src/script/app.js'],
  },
  output: {
    path: resolve('public'),
    filename: "bundle.js",
  },
  performance: {
    hints: false
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
      test: /\.png|jpg|jpeg|bmp|gif|ttf|woff|woff2|eot|svg$/,
      use: "file-loader?limit=8192&name=[path][name].[ext]"
    }]
  },
  plugins: [
    // 部分插件默认已经支持，无需再次配置，详见文档 https://webpack.js.org/migrate/4/#deprecated-removed-plugins
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
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
        });
      },
    }),
  ],
}