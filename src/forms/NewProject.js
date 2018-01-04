import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
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
    return (
      <div>
        <h2>Neues Projekt anlegen</h2>
        <form className="NewProjectForm" onSubmit={this.handleNewProject.bind(this)}>
          <input className="Input" type="text" ref="projectTitle" placeholder="Projekttitel" required/><br />
          <textarea className="Input" type="text" ref="projectDescription" rows="15" placeholder="Projektbeschreibung" required/><br />
          <textarea className="Input" type="text" ref="projectNotice" rows="10" placeholder="Projektnotizen" /><br />
          <div className="Container">
            <h3 className="Heading">Aufgaben</h3>
            <Link to="/newTask" className="Button"><i id="NewProject" className="fa fa-plus-circle"></i>neue Aufgabe</Link>
          </div>
          <div className="Container">
            <h3 className="Heading">Benutzer</h3>
            <Link to="/newEmployee" className="Button"><i id="NewProject" className="fa fa-plus-circle"></i>neuer Benutzer</Link>
          </div>
          <div className="Container">
            <h3 className="Heading">Meilensteine</h3>
          </div>
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
