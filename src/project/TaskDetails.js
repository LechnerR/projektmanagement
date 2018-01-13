import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './Detailview.css';
import Detailview from "./Detailview";

var axios = require('axios')
const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

// var taskID = -1;
// var task = [];
// var employees = [];

class TaskDetails extends Component {

    static reload = false;

    constructor(props) {
        super(props);
        // taskID = props.match.params.id
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
        // var self = this;
        // axios.get(url + 'ProjectTask?ID=' + taskID)
        //     .then(function (response) {
        //         task = response.data.Items[0];
        //         axios.get(url + 'Employee?ProjectTaskID=' + taskID)
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


    deleteTask(id, emp) {
        Detailview.reload = true;
        axios.delete(url + 'ProjectTask?ID=' + id)
            .then(response => {
                console.log('Aufgabe wurde erfolgreich gelöscht', response)
                for (let e in emp) {
                    console.log('delete employee - e', e[0])
                    axios.delete(url + 'Employee?ID=' + e.ID)
                        .then(response => {
                            console.log('Employee wurde erfolgreich gelöscht', response)
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        // if (TaskDetails.reload) {
        //     this.reload()
        // }
        return (
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
                                            {e.Name} - {e.Email}
                                        </li>
                                    ))
                                }
                                </ul>
                                <div className="Container">
                                    <Link to={{
                                        pathname: "/newEmployee",
                                        state: {task: {Project_ID: this.props.task.Project_ID, ID: this.props.task.ID}}
                                    }} className="Button"><i id="NewEmployee" className="fa fa-plus-circle"></i>neues
                                        Teammitglied</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <button className="Button BackButton" type="update"><Link to={{
                    pathname: '/newTask', state: {task: this.props.task}
                }}>Bearbeiten</Link></button>
                <button className="Button BackButton" type="delete"
                        onClick={() => this.deleteTask(this.props.task.ID, this.props.employees)}><Link
                    to={`/projects/${this.props.task.Project_ID}`}>Löschen</Link>
                </button>
                <button onClick={this.props.onClick} className="Button BackButton"><i id="NewProject"
                                                                                           className="fa fa-caret-left"></i>Zurück</button>
            </div>
        )
    }
}

export default TaskDetails;
