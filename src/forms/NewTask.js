import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import './Forms.css';

class NewTask extends Component {

  handleNewTask(e) {
    e.preventDefault();
    let taskTitle = this.refs.taskTitle.value;
    let taskDescription = this.refs.taskDescription.value;
    let taskNotice = this.refs.taskNotice.value;

    // hier müssen iwie die ganzen Daten gesammelt werden damit man sie weiterverarbeiten kann

    // tasks
    // employees
    // dates

    //this.props.onRegistration(projectTitle, projectDescription, projectNotice);
  }

  render () {
    return (
      <div>
        <h2>Neue Aufgabe anlegen</h2>
        <form className="NewProjectForm" onSubmit={this.handleNewTask.bind(this)}>
          <input className="Input" type="text" ref="taskTitle" placeholder="Aufgabentitel" required/><br />
          <textarea className="Input" type="text" ref="taskDescription" rows="15" placeholder="Aufgabenbeschreibung" required/><br />
          <textarea className="Input" type="text" ref="taskNotice" rows="10" placeholder="Aufgabennotizen" /><br />
          <div className="Container">
            <h3 className="Heading">Benutzer</h3>
            <Link to="/newEmployee" className="Button"><i id="NewProject" className="fa fa-plus-circle"></i>neuer Benutzer</Link>
          </div>
          <div className="Container">
            <h3 className="Heading">Termine</h3>
            <Link to="/newMilestone" className="Button"><i id="NewProject" className="fa fa-plus-circle"></i>neuer Termin</Link>
          </div>
          <div className="Container">
            <button className="Button" type="submit">Speichern</button>
            <button className="Button" type="reset"><Link to="/newProject">Abbrechen</Link></button>
          </div>
        </form>
      </div>
    )
  }
}


export default NewTask;
