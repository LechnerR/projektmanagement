import React, {Component} from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect
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


const Projects = () => {
    return (
        <Switch>
          <Route path='/projects' component={Dashboard} />
          <Route path='/projects/:id' component={Detailview} />
        </Switch>
    )
}

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          projects: [],
          project: null,
          employees: [],
          tasks: [],
          newProject: false,
          newTask: false
        };
    }

    getAllProjects() {
      getProjects().then((projects) => {
        this.setState({projects});
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

    goToNewProjectForm() {
      this.setState({newProject: true});
    }

    goToNewTaskForm() {
      this.setState({newTask: true});
    }

    goBack() {
      this.setState({ project: null,
                      employees: [],
                      tasks: [],
                      newProject: false,
                      newTask: false
                    });
    }

    goBackToDetailview() {
      this.setState({
        newTask: false,
        newProject: false
      });
    }

    goBackToTaskDetailview() {
      this.setState({
        newTask: false,
        newProject: false
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
        const newProject = this.state.newProject;
        const newTask = this.state.newTask;
        const newEmployee = this.state.newEmployee;

        let content;
        if (oneProject && newEmployee) {
          content = <NewEmployee heading="Neuen Mitarbeiter anlegen" onClick={this.goBackToTaskDetailview.bind(this)} />
        } else if (oneProject && newTask) {
          content = <NewTask project={oneProject} heading="Neue Aufgabe" onClick={this.goBackToDetailview.bind(this)} />
        } else if (newProject) {
          content = <NewProject heading="Neues Projekt" onClick={this.goBack.bind(this)} />
        } else if (oneProject) {
          content = <Detailview project={oneProject.Items[0]} onClick={this.goBack.bind(this)} employees={employees} tasks={tasks} newTask={this.goToNewTaskForm.bind(this)} />
        } else {
          content = (
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
                                        <p><button onClick={() => this.getOneProject(proj.ID)} className="Details">Details</button></p>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Grid>
                <button className="Button NewProject" onClick={() => this.goToNewProjectForm()}><i id="NewProject" className="fa fa-plus-circle"></i>neues Projekt</button>
            </div>
          );
        }
        // console.log('Projekte: ', allProjects.length, allProjects, this.state.project);
        // console.log('Projekt: ', oneProject);
        // console.log('Mitarbeiter: ', employees, employees.length);
        // console.log('Tasks: ', tasks, tasks.length);
        // console.log('newProject: ', newProject);
        // console.log('newTask: ', newTask);
        // console.log('newEmployee: ', newEmployee);

        return (
          <div>{content}</div>
        )
    }
}

export default Dashboard;
