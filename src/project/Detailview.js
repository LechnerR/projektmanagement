import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import TaskDetails from './TaskDetails.js';
import Dashboard from '../dashboard/Dashboard.js';

import './Detailview.css';

var axios = require('axios')
const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

var tasks = [];
var employees = [];

class Detailview extends Component {
    static reload = false;

    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);


    }

    componentDidMount() {
        var self = this;
        axios.get(url + 'ProjectTask?Project=' + this.props.project.ID)
            .then(function (response) {
                tasks = response.data.Items;
                axios.get(url + 'Employee?Project=' + this.props.project.ID)
                    .then(function (response) {
                        employees = response.data.Items;
                        self.forceUpdate();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    reload() {
        var self = this;
        axios.get(url + 'ProjectTask?Project=' + this.props.project.ID)
            .then(function (response) {
                tasks = response.data.Items;
                axios.get(url + 'Employee?Project=' + this.props.project.ID)
                    .then(function (response) {
                        employees = response.data.Items;
                        self.forceUpdate();
                        Detailview.reload = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteProject(id) {
        Dashboard.reload = true;
        axios.delete(url + 'Project?ID=' + id)
            .then(response => {
                console.log('Projekt wurde erfolgreich gelöscht', response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (Detailview.reload) {
            this.reload();
        }
        console.log('Detailview - this.props', this.props);
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
                                {
                                    tasks.map(t => (
                                        <ul className="List">
                                            <Link to={`/TaskDetails/${t.ID}`}>{t.Title} - {t.Deadline}</Link>
                                        </ul>
                                    ))
                                }
                            </div>
                        </Col>
                        <Col xs={6} md={4} className="ProjectDetails">
                            <div className="jumbotron">
                                <h3>Aufgaben</h3>
                                {
                                    tasks.map(t => (
                                        <ul className="List">
                                            <Link to={`/TaskDetails/${t.ID}`}>{t.Title}</Link>
                                        </ul>
                                    ))
                                }


                                {/*<ul className="List">
                                    <Link to="/TaskDetails/1">Aufgabe 1</Link>
                                </ul>*/}
                                <div className="Container">
                                    <Link to="/newTask" className="Button"><i id="NewProject"
                                                                              className="fa fa-plus-circle"></i>neue
                                        Aufgabe</Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} md={4} className="ProjectDetails">
                            <div className="jumbotron">
                                <h3>Team</h3>
                                {
                                    employees.map(e => (
                                        <ul className="List">
                                            {e.Name} - {e.Email}
                                        </ul>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <button className="Button BackButton" type="update"><Link to={{
                    pathname: '/newProject', state: {project: this.props.project}
                }}>Bearbeiten</Link></button>
                <button className="Button BackButton" type="delete"
                        onClick={() => this.deleteProject(this.props.project.ID)}><Link to="/dashboard">Löschen</Link>
                </button>
                <Link to="/dashboard" className="Button BackButton"><i id="NewProject" className="fa fa-caret-left"></i>Zurück</Link>
            </div>
        )
    }
}

export default Detailview;
