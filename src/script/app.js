import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './routes'
import '#/common/base.js';
// import '#/styles/common.scss';
// 使用 babel-plugin-react-css-modules 后发现匿名路径 # 对 scss 文件不可用，正在寻找解决方案，，
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>
), document.getElementById("app"))