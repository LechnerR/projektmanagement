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

class Detailview extends Component {

    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);


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
                                <ul className="List">
                                    <li>asdf</li>
                                    <li>asdf</li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={6} md={4} className="ProjectDetails">
                            <div className="jumbotron">
                                <h3>Aufgaben</h3>
                                <ul className="List">
                                    <Link to="/TaskDetails/1">Aufgabe 1</Link>
                                    <li>asdf</li>
                                </ul>
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
                                <ul className="List">
                                    <li>asdf</li>
                                    <li>asdf</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <button className="Button BackButton" type="delete"
                        onClick={() => this.deleteProject(this.props.project.ID)}><Link to="/dashboard">Löschen</Link>
                </button>
                <Link to="/dashboard" className="Button BackButton"><i id="NewProject" className="fa fa-caret-left"></i>Zurück</Link>
            </div>
        )
    }
}

export default Detailview;
