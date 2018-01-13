import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard.js';
import TaskDetails from './TaskDetails.js';
import { getEmployeesPerTask, getTask } from '../Api.js';

import './Detailview.css';

// var axios = require('axios')
// const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'
//
// var tasks = [];
// var employees = [];

class Detailview extends Component {
    static reload = false;

    constructor(props) {
        super(props);
        // this.deleteProject = this.deleteProject.bind(this);
        this.state = {
          task: null,
          employees: []
        };
    }


    componentDidMount() {
        // var self = this;
        // axios.get(url + 'ProjectTask?ProjectID=' + self.props.project.ID)
        //     .then(function (response) {
        //         tasks = response.data.Items;
        //         axios.get(url + 'Employee?ProjectID=' + self.props.project.ID)
        //             .then(function (response) {
        //                 employees = response.data.Items;
        //                 self.forceUpdate();
        //             })
        //             .catch(function (error) {
        //                 console.log(error);
        //             });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // this.getOneProject(this.props.project.id);
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
      this.setState({ task: null,
                      employees: []
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

    // deleteProject(id) {
    //     Dashboard.reload = true;
    //     axios.delete(url + 'Project?ID=' + id)
    //         .then(response => {
    //             console.log('Projekt wurde erfolgreich gelöscht', response)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    render() {
        // if (Detailview.reload) {
        //     this.reload();
        // }

        const oneTask = this.state.task;
        const employees = this.state.employees;
        console.log('Task: ', oneTask);
        console.log('Mitarbeiter: ', employees);
        console.log('alle Mitarbeiter: ', this.props.employees);

        if (!oneTask) {
          return (
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
                                              <Link onClick={() => this.getOneTask(t.ID)} to={`/TaskDetails/${t.ID}`}>{t.Title} {t.Description}
                                                  - {t.Deadline}</Link>
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
                                              <Link onClick={() => this.getOneTask(t.ID)} to={`/TaskDetails/${t.ID}`}>{t.Title}</Link>
                                          </li>

                                      ))
                                  }
                                  </ul>
                                  <div className="Container">
                                      <Link
                                          to={{pathname: '/newTask', state: {task: {Project_ID: this.props.project.ID}}}}
                                          className="Button"><i id="NewProject"
                                                                className="fa fa-plus-circle"></i>neue
                                          Aufgabe</Link>
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
                  <button className="Button BackButton" type="update"><Link to={{
                      pathname: '/newProject', state: {project: this.props.project}
                  }}>Bearbeiten</Link></button>
                  <Link to="/dashboard"><button className="Button BackButton" type="delete"
                          onClick={() => this.deleteProject(this.props.project.ID)}>Löschen
                  </button></Link>
                  <button className="Button BackButton" onClick={this.props.onClick}><i id="NewProject" className="fa fa-caret-left"></i>Zurück</button>
              </div>
          )
        } else {
          return (
            <TaskDetails employees={employees} task={oneTask.Items[0]} onClick={this.goBack.bind(this)} />
          );
        }


    }
}

export default Detailview;
