// import React from 'react';
// import ReactDOM from 'react-dom';
// import router from './routers';

// // 渲染
// ReactDOM.render(
  //   router,
  //   document.getElementById('app')
  // );
  
  
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './routes'
import '#/common/base.js';
import '#/styles/common.scss';

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>
), document.getElementById("app"))