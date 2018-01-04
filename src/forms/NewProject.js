import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Forms.css';

class NewProject extends Component {

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

  render () {
    let project = {
      projectTitle: "",
      projectDescription: "",
      projectNotice: ""
      // tasks, employees and milestones are still missing
    };
    if (this.props.project) {
      project = {
        projectTitle: this.props.project.title,
        projectDescription: this.props.project.description,
        projectNotice: this.props.project.notice
      }
    }


    return (
      <div>
        <h2>Neues Projekt anlegen</h2>
        <form className="NewProjectForm" onSubmit={this.handleNewProject.bind(this)}>
          <input className="Input" type="text" ref="projectTitle" placeholder="Projekttitel" defaultValue={project.projectTitle} required/><br />
          <textarea className="Input" type="text" ref="projectDescription" rows="15" placeholder="Projektbeschreibung" defaultValue={project.projectDescription} required/><br />
          <textarea className="Input" type="text" ref="projectNotice" rows="10" placeholder="Projektnotizen" defaultValue={project.projectNotice} /><br />
          <div className="Container">
            <button className="Button" type="submit">Speichern</button>
            <button className="Button" type="reset"><Link to="/dashboard">Abbrechen</Link></button>
          </div>
        </form>
      </div>
    )
  }
}


export default NewProject;
