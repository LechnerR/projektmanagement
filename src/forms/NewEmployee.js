import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';
import Detailview from "../project/Detailview";
import TaskDetails from "../project/TaskDetails";


var axios = require('axios')
const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'
var createEmployee = {};
var updateEmployee = false;
var initUpdate = true;

class NewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                employeeName: '',
                employeeEmail: '',
                taskID: '',
                projectID: ''
            }
        };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);

    }

    handleName(event) {
        this.setState({
            value: {
                employeeName: event.target.value,
                employeeEmail: this.state.value.employeeEmail,
                taskID: this.state.value.taskID,
                projectID: this.state.value.projectID
            }
        });
    }

    handleEmail(event) {
        this.setState({
            value: {
                employeeName: this.state.value.employeeName,
                employeeEmail: event.target.value,
                taskID: this.state.value.taskID,
                projectID: this.state.value.projectID
            }
        });
    }

    render() {

        this.state = {
            value: {
                employeeName: this.state.value.employeeName,
                employeeEmail: this.state.value.employeeEmail,
                // projectID: this.props.location.state.task.Project_ID,
                // taskID: this.props.location.state.task.ID
            }
        }

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm">
                    <input className="Input" type="text" ref="name" placeholder="Name"
                           defaultValue={this.state.value.employeeName} onChange={this.handleName} required/><br/>
                    <input className="Input" type="email" ref="email" placeholder="E-Mail"
                           defaultValue={this.state.value.employeeEmail} onChange={this.handleEmail} required/><br/>
                    <div className="Container">
                        <button className="Button" type="submit" onClick={() => {
                            this.saveValues();
                            this.createEmployee()
                        }}><Link to={`/projects/${this.state.value.projectID}`}>Speichern</Link></button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                    </div>
                </form>
            </div>
        )
    }

    saveValues() {
        console.log('NewEmployee - saveValues - this.state.value', this.state.value);
        createEmployee = {
            Name: this.state.value.employeeName,
            Email: this.state.value.employeeEmail,
            ProjectID: this.state.value.projectID,
            TaskID: this.state.value.taskID,
            ID: new Date().valueOf()
        }
    }

    createEmployee() {
        Detailview.reload = true;
        TaskDetails.reload = true;
        axios.post(url + 'Employee', createEmployee)
            .then(response => {
                console.log('Mitarbeiter erfolgreich erstellt', response)
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export default NewEmployee;
