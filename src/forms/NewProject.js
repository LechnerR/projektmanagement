import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleNewProject(e) {
        e.preventDefault();
        let projectTitle = this.refs.projectTitle.value;
        let projectDescription = this.refs.projectDescription.value;
        let projectNotice = this.refs.projectNotice.value;

        // hier müssen iwie die ganzen Daten gesammelt werden damit man sie weiterverarbeiten kann

        // tasks
        // employees
        // dates

        //this.props.onRegistration(projectTitle, projectDescription, projectNotice);
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
            if (this.props.location.state) {
                if (this.props.location.state.project) {
                    updateProject = true;
                    initUpdate = false;
                    this.state = {
                        value: {
                            projectTitle: this.props.location.state.project.Title,
                            projectDescription: this.props.location.state.project.Description,
                            projectNotice: this.props.location.state.project.Notice,
                            ID: this.props.location.state.project.ID
                        }
                    }
                }
            }
        }


        return (
            <div>
                <h2>Neues Projekt anlegen</h2>
                <form className="NewProjectForm" onSubmit={this.handleNewProject.bind(this)}>
                    <input className="Input" type="text" ref="projectTitle" placeholder="Projekttitel"
                           defaultValue={this.state.value.projectTitle} onChange={this.handleTitle} required/><br/>
                    <textarea className="Input" type="text" ref="projectDescription" rows="15"
                              placeholder="Projektbeschreibung" defaultValue={this.state.value.projectDescription}
                              onChange={this.handleDescription} required/><br/>
                    <textarea className="Input" type="text" ref="projectNotice" rows="10" placeholder="Projektnotizen"
                              defaultValue={this.state.value.projectNotice} onChange={this.handleNotice}/><br/>
                    <div className="Container">
                        <button className="Button" type="submit" onClick={() => {
                            this.saveValues();
                            this.createProject()
                        }}><Link to="/dashboard">Speichern</Link></button>
                        <button className="Button" type="reset"><Link to={{pathname: '/dashboard'}}>Abbrechen</Link>
                        </button>
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
            console.log('Lets update a project...');
            updateProject = false;
            initUpdate = true;
        }
        Dashboard.reload = true;
        console.log('createProject - createProject', createProject);
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
