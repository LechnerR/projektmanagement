import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import './Forms.css';

class NewEmployee extends Component {

  handleNewUser(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let email = this.refs.email.value;

    // hier müssen iwie die ganzen Daten gesammelt werden damit man sie weiterverarbeiten kann

    //this.props.onRegistration(projectTitle, projectDescription, projectNotice);
  }

  render () {
    return (
      <div>
        <h2>Neuen Benutzer anlegen</h2>
        <form className="NewProjectForm" onSubmit={this.handleNewUser.bind(this)}>
          <input className="Input" type="text" ref="name" placeholder="Name" required/><br />
          <input className="Input" type="email" ref="email" placeholder="E-Mail" required/><br />
          <div className="Container">
            <button className="Button" type="submit">Speichern</button>
            <button className="Button" type="reset"><Link to="/dashboard">Abbrechen</Link></button>
          </div>
        </form>
      </div>
    )
  }
}


export default NewEmployee;
