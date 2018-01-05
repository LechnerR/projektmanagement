import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './dashboard/Dashboard.js';
import Detailview from './project/Detailview.js';
import registerServiceWorker from './registerServiceWorker';


/*const Projects = () => {
    return (
        <Switch>
          <Route path='/dashboard' component={AllProjects} />
          <Route path='/projects/:id' component={Project} />
          <Route path='/newProject' component={NewProject} />
          <Route path='/newTask' component={NewTask} />
          <Route path='/newEmployee' component={NewEmployee} />
          <Route path='/taskDetails/:id' component={TaskDetails} />
        </Switch>
    )
}*/

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' component={App}/>
          // just for testing
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/projects/:id' component={Detailview}/>
            {/*<Route path='/newProject' component={NewProject} />
          <Route path='/newTask' component={NewTask} />
          <Route path='/newEmployee' component={NewEmployee} />
          <Route path='/taskDetails/:id' component={TaskDetails} />*/}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
