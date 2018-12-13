module.exports = {
  plugins: [
    require("autoprefixer")({ browsers: ['last 2 versions'] }),
    // require("cssnano")() // 使用 react-css-modules 导致 background 相对路径出问题。最终发现都是这个惹的祸，去掉后，世界都安静了。
  ]
}