import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard.js';
import './Forms.css';
import { updateProject } from '../Api.js';


class NewProject extends Component {

    constructor(props) {
        console.log('NewProject constructor - props', props);
        super(props);
        this.state = {
            project: {
                Description: '',
                ID: -1,
                Notice: '',
                Title: ''
            },
            create: false
        };

    }


    handleNewProject(e) {
        e.preventDefault();

        let project = this.props.project;
        if (project) {
          this.setState({
            project: {
              Title: this.refs.projectTitle.value,
              Description: this.refs.projectDescription.value,
              Notice: this.refs.projectNotice.value,
              ID: this.props.project.ID
            }
          }, function () {
            // console.log('Projekt updaten: ', this.state.project);
            updateProject(this.state.project);
            this.props.onClick();
          });
        } else {
          this.setState({
            project: {
              Title: this.refs.projectTitle.value,
              Description: this.refs.projectDescription.value,
              Notice: this.refs.projectNotice.value,
              ID: new Date().valueOf()
            }
          }, function () {
            // console.log('neues Projekt: ', this.state.project);
            updateProject(this.state.project);
            this.props.onClick();
          });
        }
    }

    render() {

        let project = this.props.project;
        if (!project) {
          project = this.state.project;
        }
        // console.log("Projekt: ", this.state.project);

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm" onSubmit={this.handleNewProject.bind(this)}>
                    <input className="Input" type="text" ref="projectTitle" placeholder="Projekttitel"
                           defaultValue={project.Title} required/><br/>
                    <textarea className="Input" type="text" ref="projectDescription" rows="15"
                              placeholder="Projektbeschreibung" defaultValue={project.Description}
                             required/><br/>
                    <textarea className="Input" type="text" ref="projectNotice" rows="10" placeholder="Projektnotizen"
                              defaultValue={project.Notice} /><br/>
                    <div className="Container">
                        <button className="Button" type="submit">Speichern</button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default NewProject;
