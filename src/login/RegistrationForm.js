import React, { Component } from 'react';
import './Forms.css';
import Input from 'react-bootstrap';
import Button from 'react-bootstrap';

class RegistrationForm extends Component {
  handleRegistration(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onRegistration(username, password);
  }

  render() {
    return (
      <form className="Login" onSubmit={this.handleRegistration.bind(this)}>
        <input className="Input" type="text" ref="username" placeholder="Benutzername" required/><br />
        <input className="Input" type="password" ref="password" placeholder="Passwort" required/><br />
        <button className="Button" type="submit">Registrieren</button>
      </form>
    );
  }
}

export default RegistrationForm;
