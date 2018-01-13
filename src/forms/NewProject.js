import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard.js';

import './Forms.css';

var axios = require('axios')
const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'
var createProject = {};
var updateProject = false;
var initUpdate = true;

class NewProject extends Component {

    constructor(props) {
        console.log('NewProject constructor - props', props);
        super(props);
        this.state = {
            value: {
                projectTitle: '',
                projectDescription: '',
                projectNotice: ''
            }
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleNotice = this.handleNotice.bind(this);
    }


    handleNewProject(e) {
        e.preventDefault();
    }

    handleTitle(event) {
        this.setState({
            value: {
                projectTitle: event.target.value,
                projectDescription: this.state.value.projectDescription,
                projectNotice: this.state.value.projectNotice,
                ID: this.state.value.ID
            }
        });
    }

    handleDescription(event) {
        this.setState({
            value: {
                projectTitle: this.state.value.projectTitle,
                projectDescription: event.target.value,
                projectNotice: this.state.value.projectNotice,
                ID: this.state.value.ID
            }
        });
    }

    handleNotice(event) {
        this.setState({
            value: {
                projectTitle: this.state.value.projectTitle,
                projectDescription: this.state.value.projectDescription,
                projectNotice: event.target.value,
                ID: this.state.value.ID
            }
        });
    }

    render() {

        if (initUpdate) {
            // if (this.props.location.state) {
            //     if (this.props.location.state.project) {
            //         updateProject = true;
            //         initUpdate = false;
            //         this.state = {
            //             value: {
            //                 projectTitle: this.props.location.state.project.Title,
            //                 projectDescription: this.props.location.state.project.Description,
            //                 projectNotice: this.props.location.state.project.Notice,
            //                 ID: this.props.location.state.project.ID
            //             }
            //         }
            //     }
            // }
        }

        // let Heading = null;
        // if (this.props.location.state) {
        //     Heading = <h2>Projekt ändern</h2>;
        // } else {
        //     Heading = <h2>Neues Projekt anlegen</h2>;
        // }

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm" onSubmit={this.handleNewProject.bind(this)}>
                    <input className="Input" type="text" ref="projectTitle" placeholder="Projekttitel"
                           defaultValue={this.props.project.Title} onChange={this.handleTitle} required/><br/>
                    <textarea className="Input" type="text" ref="projectDescription" rows="15"
                              placeholder="Projektbeschreibung" defaultValue={this.props.project.Description}
                              onChange={this.handleDescription} required/><br/>
                    <textarea className="Input" type="text" ref="projectNotice" rows="10" placeholder="Projektnotizen"
                              defaultValue={this.props.project.Notice} onChange={this.handleNotice}/><br/>
                    <div className="Container">
                        <button className="Button" type="submit" onClick={() => {
                            this.saveValues();
                            this.createProject()
                        }}><Link to="/dashboard">Speichern</Link></button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                    </div>
                </form>
            </div>
        )
    }

    saveValues() {
        if (updateProject) {
            createProject = {
                Title: this.state.value.projectTitle,
                Description: this.state.value.projectDescription,
                Notice: this.state.value.projectNotice,
                ID: this.state.value.ID
            }
        } else {
            createProject = {
                Title: this.state.value.projectTitle,
                Description: this.state.value.projectDescription,
                Notice: this.state.value.projectNotice,
                ID: new Date().valueOf()
            }
        }


    }

    createProject() {
        if (updateProject) {
            updateProject = false;
            initUpdate = true;
        }
        Dashboard.reload = true;
        axios.post(url + 'Project', createProject)
            .then(response => {
                console.log('Projekt erfolgreich erstellt', response)
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export default NewProject;
