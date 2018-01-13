import React, {Component} from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './Dashboard.css';
import { getProjects, getProject, getEmployeesPerProject, getTasksPerProject } from '../Api.js';
import Detailview from '../project/Detailview.js';
import NewProject from '../forms/NewProject.js';
import NewTask from '../forms/NewTask.js';
import NewEmployee from '../forms/NewEmployee.js';
import TaskDetails from '../project/TaskDetails.js';

// var axios = require('axios')


// const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

// var projects = [];

const Projects = () => {
    return (
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/projects/:id' component={Detailview} />
          <Route path='/newProject' component={NewProject} />
          <Route path='/newTask' component={NewTask} />
          <Route path='/newEmployee' component={NewEmployee} />
          <Route path='/taskDetails/:id' component={TaskDetails} />
        </Switch>
    )
}

class Dashboard extends Component {
    // static reload = false;

    constructor(props) {
        super(props);

        // this.reload = this.reload.bind(this);

        this.state = {
          projects: [],
          project: null,
          employees: [],
          tasks: []
        };
    }

    getAllProjects() {
      getProjects().then((projects) => {
        this.setState({ projects});
      });
    }

    getOneProject(id) {
      getProject(id).then((project) => {
        this.setState({project});
      });
      getEmployeesPerProject(id).then((employees) => {
        this.setState({employees});
      });
      getTasksPerProject(id).then((tasks) => {
        this.setState({tasks});
      });
    }

    goBack() {
      this.setState({ project: null,
                      employees: [],
                      tasks: []
                    });
    }

    componentDidMount() {
        this.getAllProjects();
    }

    render() {

        const allProjects = this.state.projects;
        const oneProject = this.state.project;
        const employees = this.state.employees;
        const tasks = this.state.tasks;
        console.log('Projekte: ', allProjects.length, allProjects, this.state.project);
        console.log('Projekt: ', oneProject);
        console.log('Mitarbeiter: ', employees, employees.length);
        console.log('Tasks: ', tasks, tasks.length);
        if (!oneProject) {
          return (
            <div>
              <h2>Projektübersicht</h2>
                <Grid>
                    <Row className="show-grid">
                        {
                            allProjects.Count > 0 && allProjects.Items.map((proj, index) => (
                                <Col xs={6} md={4} key={index} className="Project">
                                    <div className="jumbotron">
                                        <h3>{proj.Title}</h3>
                                        <p>{proj.Description}</p>
                                        <p><Link onClick={() => this.getOneProject(proj.ID)} className="Details" to={`/projects/${proj.ID}`}>Details</Link></p>
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
        } else {
          return (
            <Detailview project={oneProject.Items[0]} onClick={this.goBack.bind(this)} employees={employees} tasks={tasks} />
          );
        }

    }
}

// const ProjectAPI = {
//     get: function (id) {
//         const isProject = p => p.ID === id
//         return projects.find(isProject)
//     }
// }


// function AllProjects(props) {
//     return (
//         <div>
//             <h2>Projektübersicht</h2>
//             <Grid>
//                 <Row className="show-grid">
//                     {
//                         projects.map(p => (
//                             <Col xs={6} md={4} key={p.ID} className="Project">
//                                 <div className="jumbotron">
//                                     <h3>{p.Title}</h3>
//                                     <p>{p.Description}</p>
//                                     <p><Link className="Details" to={`/projects/${p.ID}`}>Details</Link></p>
//                                 </div>
//                             </Col>
//                         ))
//                     }
//                 </Row>
//             </Grid>
//             <Link to="/newProject" className="Button NewProject"><i id="NewProject" className="fa fa-plus-circle"></i>neues
//                 Projekt</Link>
//         </div>
//     );
//
// }


// function Project(props) {
//     console.log('Project - props', props);
//     const project = ProjectAPI.get(
//         parseInt(props.match.params.id, 10)
//     )
//     if (!project) {
//         return <div>Sorry, but the project was not found</div>
//     }
//     return (
//         <Detailview project={project}/>
//     )
// }

export default Dashboard;
