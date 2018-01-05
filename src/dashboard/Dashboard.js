import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './Dashboard.css';
import Detailview from '../project/Detailview.js';
import NewProject from '../forms/NewProject.js';
import NewTask from '../forms/NewTask.js';
import NewEmployee from '../forms/NewEmployee.js';
import TaskDetails from '../project/TaskDetails.js';

var axios = require('axios')

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

const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }


    componentWillMount() {
        var self = this;
        axios.get(url + '/Project')
            .then(function (response) {
                self.setState({projects: response.data.Items})
                console.log('componentWillMount - self.state', self.state);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <h2>Projektübersicht</h2>
                <Grid>
                    <Row className="show-grid">
                        {
                            this.state.projects.map(p => (
                                <Col xs={6} md={4} key={p.ID} className="Project">
                                    <div className="jumbotron">
                                        <h3>{p.Title}</h3>
                                        <p>{p.Description}</p>
                                        <p><Link className="Details" to={`/projects/${p.ID}`}>Details</Link></p>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Grid>
                <Link to="/newProject" className="Button NewProject"><i id="NewProject"
                                                                        className="fa fa-plus-circle"></i>neues
                    Projekt</Link>
            </div>
        );
    }
}

/*const ProjectAPI = {
    /!*projects: [
      { id: 1, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt A", title:"Projekt A", notice:"Notiz" },
      { id: 2, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt B", title:"Projekt B", notice:"Notiz" },
      { id: 3, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt C", title:"Projekt C", notice:"Notiz" },
      { id: 4, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt D", title:"Projekt D", notice:"Notiz" },
      { id: 5, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt E", title:"Projekt E", notice:"Notiz" },
      { id: 6, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt F", title:"Projekt F", notice:"Notiz" }
    ],*!/
    loadAll: function () {
        axios.get(url + '/Project'/!*, {
          params: {
              ID: 12345
          }
      }*!/)
            .then(function (response) {
                this.state.projects = response.data.Items;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    get: function (id) {
        const isProject = p => p.ID === id
        return this.state.projects.find(isProject)
    }
}*/


/*function AllProjects(props) {
    console.log('AllProjects - props', props);
    console.log('AllProjects - this.state', this.state);
    return (
        <div>
            <h2>Projektübersicht</h2>
            <Grid>
                <Row className="show-grid">
                    {
                        this.state.projects.map(p => (
                            <Col xs={6} md={4} key={p.ID} className="Project">
                                <div className="jumbotron">
                                    <h3>{p.Title}</h3>
                                    <p>{p.Description}</p>
                                    <p><Link className="Details" to={`/projects/${p.ID}`}>Details</Link></p>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Grid>
            <Link to="/newProject" className="Button NewProject"><i id="NewProject" className="fa fa-plus-circle"></i>neues
                Projekt</Link>
        </div>
    );
}

function Project(props) {
    const project = ProjectAPI.get(
        parseInt(props.match.params.ID, 10)
    )
    if (!project) {
        return <div>Sorry, but the project was not found</div>
    }
    return (
        <Detailview project={project}/>
    )
}*/

export default Dashboard;
