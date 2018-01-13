import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';
import Detailview from "../project/Detailview";
import TaskDetails from "../project/TaskDetails";
import { updateEmployee, deleteEmployee } from '../Api.js';


class NewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: {
                Name: '',
                Email: '',
                taskID: '',
                projectID: ''
            }
        };
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    handleNewEmployee(e) {
        e.preventDefault();

        let employee = this.props.employee;
        if (employee) {
          this.setState({
            employee: {
              Name: this.refs.name.value,
              Email: this.refs.email.value,
              TaskID: this.props.employee.TaskID,
              ProjectID: this.props.employee.ProjectID,
              ID: this.props.employee.ID
            }
          }, function () {
            // console.log('MA updaten: ', this.state.employee);
            updateEmployee(this.state.employee);
            this.props.onClick();
          });
        } else {
          this.setState({
            employee: {
              Name: this.refs.name.value,
              Email: this.refs.email.value,
              TaskID: this.props.task.Items[0].ID,
              ProjectID: this.props.task.Items[0].Project_ID,
              ID: new Date().valueOf()
            }
          }, function () {
            // console.log('neuer MA: ', this.state.employee);
            updateEmployee(this.state.employee);
            this.props.onClick();
          });
        }
    }

    deleteEmployee(id) {
      deleteEmployee(id);
      this.props.onClick();
    }

    render() {
      let employee = this.props.employee;
      if (!employee) {
        employee = this.state.employee;
      }
      // console.log("employee: ", this.state.employee);

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm" onSubmit={this.handleNewEmployee.bind(this)}>
                    <input className="Input" type="text" ref="name" placeholder="Name"
                           defaultValue={employee.Name} required/><br/>
                    <input className="Input" type="email" ref="email" placeholder="E-Mail"
                           defaultValue={employee.Email} required/><br/>
                    <div className="Container">
                      <button className="Button" type="submit">Speichern</button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                      {
                          this.props.employee &&
                          <button className="Button" type="delete"
                                  onClick={() => this.deleteEmployee(employee.ID)}>Löschen
                          </button>
                      }

                    </div>
                </form>
            </div>
        )
    }

}

export default NewEmployee;
