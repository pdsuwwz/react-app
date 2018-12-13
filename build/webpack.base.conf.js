const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const manifest = require('../vendor/dll/vendor-manifest.json');
const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  mode: process.env.NODE_ENV,
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
    rules: [
      {
      enforce: 'pre',
      test: /\.(jsx?)$/,
      loader: 'eslint-loader',
      include: resolve('src'),
      options: {
        fix: true,
        cache: resolve('.cache/eslint'),
        failOnError: true, // 生产环境发现代码不合法，则中断编译
        useEslintrc: true,
        configFile: resolve('.eslintrc.js'),
        formatter: require('eslint-friendly-formatter'),
        // baseConfig: {
        //   extends: [resolve('.eslintrc.js')]
        // }
      }
    }, 
    {
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
    },
    {
      test: /\.(png|jpe?g|bmp|gif|webp|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'assets/img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'assets/media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 8192,
        name: 'assets/fonts/[name].[hash:7].[ext]'
      }
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
      manifest
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: resolve('src/images'),
    //     to: resolve('public/static'),
    //     ignore: ['.*']
    //   }
    // ]), // 暂时用不了，因为图片资源会被打包，这样的话就导致复制和打包操作重复了
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