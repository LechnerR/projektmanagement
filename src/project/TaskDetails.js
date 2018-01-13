import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getEmployee, getEmployeesPerTask, getTask, deleteTask, deleteEmployee } from '../Api.js';
import './Detailview.css';
import Detailview from "./Detailview";
import NewTask from '../forms/NewTask.js';
import NewEmployee from '../forms/NewEmployee.js';


class TaskDetails extends Component {

    static reload = false;

    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);

        this.state = {
          task: null,
          employees: [],
          employee: null,
          edit: false
        };
    }

    componentDidMount() {

        this.getTask(this.props.task.ID);
        this.getEmployeesPerTask(this.props.task.ID);
    }

    // reload() {
    //     var self = this;
    //     axios.get(url + 'ProjectTask?ID=' + taskID)
    //         .then(function (response) {
    //             task = response.data.Items[0];
    //             axios.get(url + 'Employee?ProjectTaskID=' + taskID)
    //                 .then(function (response) {
    //                     employees = response.data.Items;
    //                     self.forceUpdate();
    //                     TaskDetails.reload = false;
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    getTask(id) {
      getTask(id).then((task) => {
        this.setState({task});
      });
    }

    getOneEmployee(id) {
      getEmployee(id).then((employee) => {
        this.setState({employee});
      });
    }

    getEmployeesPerTask(id) {
      getEmployeesPerTask(id).then((employees) => {
        this.setState({employees});
      })
    }

    goToNewTaskForm() {
      this.setState({
        edit: true
      });
    }

    getOneEmployee(id) {
      getEmployee(id).then((employee) => {
        this.setState({employee});
      });
    }

    goBack() {
      this.setState({
        edit: false,
        employee: false
      });
    }

    deleteTask(id) {
        // Detailview.reload = true;
        // console.log('arraylänge:', emp);
        getEmployeesPerTask(id).then(function (response) {
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
        deleteTask(id);
        this.props.onClick();
    }



    render() {
        if (TaskDetails.reload) {
            this.reload()
        }
        const edit = this.state.edit;
        const employee = this.state.employee;

        let content;
        if (edit) {
          content = <NewTask heading="Aufgabe bearbeiten" task={this.props.task} onClick={this.props.onClick}/>
        } else if (employee) {
          content = <NewEmployee heading="Mitarbeiter bearbeiten" employee={employee.Items[0]} onClick={this.goBack.bind(this)}/>
        } else {
          content =
            <div>
              <h1>{this.props.task.Title}</h1>
              <Grid>
                  <Row className="show-grid">
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Beschreibung</h3>
                              <p>{this.props.task.Description}</p>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Notizen</h3>
                              <p>{this.props.task.Notice}</p>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Deadline</h3>
                              <p>{this.props.task.Deadline}</p>
                          </div>
                      </Col>
                      <Col xs={6} md={4} className="ProjectDetails">
                          <div className="jumbotron">
                              <h3>Team</h3>
                              <ul className="List">
                            {
                                  (this.props.employees && this.props.employees.Count > 0) && this.props.employees.Items.map((e, index) => (
                                    <li key={index}>
                                      <a className="Link" href="#" onClick={() => this.getOneEmployee(e.ID)}>{e.Name} - {e.Email}</a>
                                    </li>
                                  ))
                              }
                              </ul>
                              <div className="Container">
                                  <button className="Button" onClick={this.props.newEmployee}><i id="NewProject" className="fa fa-plus-circle"></i>neues
                                      Teammitglied</button>
                              </div>
                          </div>
                      </Col>
                  </Row>
              </Grid>
              <button className="Button BackButton" type="update" onClick={this.goToNewTaskForm.bind(this)}>Bearbeiten</button>
              <button className="Button BackButton" type="delete"
                      onClick={() => this.deleteTask(this.props.task.ID)}>Löschen
              </button>
              <button onClick={this.props.onClick} className="Button BackButton">
                <i id="NewProject" className="fa fa-caret-left"></i>
                Zurück
              </button>
          </div>
        }

        return (
          <div>{content}</div>
        );
    }
}

export default TaskDetails;
