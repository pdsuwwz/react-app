import React from 'react'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router , Route } from 'react-router-dom'; 
import HealthCheck from '../container/healthCheck';
import App from '../container/redux-test/rr-App'  //这里引用包装过的容器组件


module.exports = (
  <Router>
    <div>
      <Route path="/Hello" component={App} /> 
      <Route path="/healthCheck" component={HealthCheck} /> 
    </div>
  </Router>
);

