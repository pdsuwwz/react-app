import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './routes'
import '#/common/base.js';
import '@commMdule/common.scss';
// 使用 babel-plugin-react-css-modules 后发现匿名路径 # 对 scss 文件不可用，正在寻找解决方案，，
// 2018年10月23日，匿名路径问题已解决，在 .babelrc 中配置 module-resolver，及在 webpack 配置文件中加入 resolve.extensions 属性即可。
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>
), document.getElementById("app"))