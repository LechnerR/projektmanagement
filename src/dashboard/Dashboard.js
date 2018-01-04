import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './Dashboard.css';
import Detailview from '../project/Detailview.js';
import NewProject from '../forms/NewProject.js';
import NewTask from '../forms/NewTask.js';
import NewEmployee from '../forms/NewEmployee.js';

const Projects = () => {
  return (
    <Switch>
      <Route path='/dashboard' component={AllProjects} />
      <Route path='/projects/:id' component={Project} />
      <Route path='/newProject' component={NewProject} />
      <Route path='/newTask' component={NewTask} />
      <Route path='/newEmployee' component={NewEmployee} />
    </Switch>
  )
}

class Dashboard extends Component {

  render () {
    return (
      <div>
        <Projects />
      </div>
    );
  }
}

const ProjectAPI = {
  projects: [
    { id: 1, start_date: "1.1.2001", end_date: "1.1.2001", description:"Beschreibung A", title:"Projekt A", notice:"Notiz" },
    { id: 2, start_date: "1.1.2001", end_date: "1.1.2001", description:"Beschreibung B", title:"Projekt B", notice:"Notiz" },
    { id: 3, start_date: "1.1.2001", end_date: "1.1.2001", description:"Beschreibung C", title:"Projekt C", notice:"Notiz" },
    { id: 4, start_date: "1.1.2001", end_date: "1.1.2001", description:"Beschreibung D", title:"Projekt D", notice:"Notiz" },
    { id: 5, start_date: "1.1.2001", end_date: "1.1.2001", description:"Beschreibung E", title:"Projekt E", notice:"Notiz" }
    // { id: 6, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt F", title:"Projekt F", notice:"Notiz" }
  ],
  all: function() { return this.projects},
  get: function(id) {
    const isProject = p => p.id === id
    return this.projects.find(isProject)
  }
}

function AllProjects(props) {
  return (
    <div>
      <h2>Projektübersicht</h2>
      <Grid>
        <Row className="show-grid">
          {
            ProjectAPI.all().map(p => (
              <Col xs={6} md={4} key={p.id} className="Project">
                <div className="jumbotron">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p><Link className="Details" to={`/projects/${p.id}`}>Details</Link></p>
                  // TODO button needs functionality
                  <button className="Trash" title="Projekt löschen"><i className="fa fa-trash-o"></i></button>
                </div>
              </Col>
            ))
          }
        </Row>
      </Grid>
      <Link to="/newProject" className="Button NewProject"><i id="NewProject" className="fa fa-plus-circle"></i>neues Projekt</Link>
    </div>
  );
}

function Project(props) {
  const project = ProjectAPI.get(
    parseInt(props.match.params.id,10)
  )
  if (!project) {
    return <div>Sorry, but the project was not found</div>
  }
  return (
    <Detailview project={project} />
  )
}

export default Dashboard;
