import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'; 
import HealthCheck from '../container/healthCheck';
import App from '../container/redux-test/rr-App'  //这里引用包装过的容器组件
import AA from '../components/A-component'
import BB from '../components/B-component'


module.exports = (
  <Router>
    <div>
      <Route path="/Hello" component={App} /> 
      <Route path="/healthCheck" component={HealthCheck} /> 
      <Route path="/Atest" component={AA} />
      <Route path="/Btest" component={BB} />
    </div>
  </Router>
);

