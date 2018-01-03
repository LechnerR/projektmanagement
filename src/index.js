import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './dashboard/Dashboard.js';
import registerServiceWorker from './registerServiceWorker';


const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={App}/>
          // just for testing
          <Route exact path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
