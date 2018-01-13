import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard.js';
import TaskDetails from './TaskDetails.js';
import NewEmployee from '../forms/NewEmployee.js';
import NewProject from '../forms/NewProject.js';
import { getEmployeesPerTask, getTask, getProject, deleteProject, getTasksPerProject, deleteTask, deleteEmployee, getEmployeesPerProject } from '../Api.js';

import './Detailview.css';


class Detailview extends Component {
    static reload = false;

    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {
          tasks: [],
          task: null,
          employees: [],
          edit: false,
          project: null,
          newEmployee: false
        };
    }


    componentDidMount() {

        this.getThisProject(this.props.project.ID);
        this.getTasksPerProject(this.props.project.ID);
        this.getEmployeesPerProject(this.props.project.ID);
        // console.log(this.props.project.ID);
    }

    // reload() {
    //     var self = this;
    //     axios.get(url + 'ProjectTask?ProjectID=' + this.props.project.ID)
    //         .then(function (response) {
    //             tasks = response.data.Items;
    //             axios.get(url + 'Employee?ProjectID=' + this.props.project.ID)
    //                 .then(function (response) {
    //                     employees = response.data.Items;
    //                     self.forceUpdate();
    //                     Detailview.reload = false;
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    goBack() {
      this.setState({
          tasks: [],
          employees: [],
          edit: false,
          project: null,
          newEmployee: false
      });
    }

    goBackToDetailview() {
      this.setState({
        edit: false
      });
    }

    getEmployeesPerProject(id) {
      getEmployeesPerProject(id).then((employees) => {
        this.setState({employees});
      });
    }
    getTasksPerProject(id) {
      getTasksPerProject(id).then((tasks) => {
        this.setState({tasks});
      });
    }

    getThisProject(id) {
      getProject(id).then((project) => {
        this.setState({project});
      });
    }

    getOneTask(id) {
      getTask(id).then((task) => {
        this.setState({task});
      });
      getEmployeesPerTask(id).then((employees) => {
        this.setState({employees});
      });
    }

    goToNewProjectForm() {
      this.setState({
        edit: true
      });
    }

    goToNewEmployeeForm() {
      this.setState({newEmployee: true});
    }

    goBackToTaskDetailview() {
      this.setState({newEmployee: false});
    }

    deleteProject(id) {
      getTasksPerProject(id).then(function (response) {
        if (response.Count > 0) {
          for (let i = 0; i < response.Count; i++) {
            deleteTask(response.Items[i].ID);
            // console.log('tasks of project:', response.Items[i].ID);
          }
        }
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
      getEmployeesPerProject(id).then(function (response) {
        if (response.Count > 0) {
          for (let i = 0; i < response.Count; i++) {
            deleteTask(response.Items[i].ID);
            // console.log('tasks of project:', response.Items[i].ID);
          }
        }
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });

      deleteProject(id);
      this.props.onClick();
    }

    render() {
        // if (Detailview.reload) {
        //     this.reload();
        // }

        const oneTask = this.state.task;
        const employees = this.state.employees;
        const edit = this.state.edit;
        const newEmployee = this.state.newEmployee;
        // console.log('newEmp: ', newEmployee);
        // console.log('Task: ', oneTask);
        // console.log('Mitarbeiter: ', employees);
        // console.log('alle Mitarbeiter: ', this.props.employees);

        let content;
        if (oneTask && newEmployee) {
          content = <NewEmployee heading="Neuen Mitarbeiter anlegen" task={oneTask} onClick={this.goBackToTaskDetailview.bind(this)} />
        } else if (oneTask) {
          content = <TaskDetails employees={employees} task={oneTask.Items[0]} onClick={this.goBack.bind(this)} newEmployee={this.goToNewEmployeeForm.bind(this)} />
        } else if (edit) {
          content = <NewProject heading="Projekt bearbeiten" project={this.props.project} onClick={this.goBackToDetailview.bind(this)}/>
        } else {
          content =
            <div>
              <h1>{this.props.project.Title}</h1>
              <Grid>
                  <Row className="show-grid">
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Beschreibung</h3>
                              <p>{this.props.project.Description}</p>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Notizen</h3>
                              <p>{this.props.project.Notice}</p>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Termine</h3>
                              <ul className="List">
                              {
                                  this.props.tasks.Count > 0 && this.props.tasks.Items.map((t, index) => (
                                        <li key={index}>
                                          <a className="Link" href="#" onClick={() => this.getOneTask(t.ID)}>{t.Title} {t.Description} - {t.Deadline}</a>
                                        </li>
                                  ))
                              }
                              </ul>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Aufgaben</h3>
                              <ul className="List">
                              {
                                  this.props.tasks.Count > 0 && this.props.tasks.Items.map((t, index) => (
                                      <li key={index}>
                                          <a className="Link" href="#" onClick={() => this.getOneTask(t.ID)}>{t.Title}</a>
                                      </li>

                                  ))
                              }
                              </ul>
                              <div className="Container">
                                  <button className="Button" onClick={this.props.newTask}><i id="NewProject"
                                                            className="fa fa-plus-circle"></i>neue Aufgabe</button>
                              </div>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Team</h3>
                                <ul className="List">
                              {
                                  (this.props.employees.Count > 0) && this.props.employees.Items.map((e, index) => (
                                      <li key={index}>
                                          {e.Name} - {e.Email}
                                      </li>
                                  ))
                              }
                              </ul>
                          </div>
                      </Col>
                  </Row>
              </Grid>
              <button className="Button BackButton" type="update" onClick={this.goToNewProjectForm.bind(this)}>
                Bearbeiten
              </button>
              <button className="Button BackButton" type="delete"
                      onClick={() => this.deleteProject(this.props.project.ID)}>Löschen
              </button>
              <button className="Button BackButton" onClick={this.props.onClick}><i id="NewProject" className="fa fa-caret-left"></i>Zurück</button>
          </div>
        }

        return (
          <div>{content}</div>
        );

    }
}

export default Detailview;
