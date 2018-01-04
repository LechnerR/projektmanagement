import React, { Component } from 'react';
import './Forms.css';

class LoginForm extends Component {

  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  render() {
    return (
      <form className="Login" onSubmit={this.handleSignIn.bind(this)}>
        <input className="Input" type="text" ref="username" placeholder="Benutzername" required/><br />
        <input className="Input" type="password" ref="password" placeholder="Passwort" required/><br />
        <button className="Button" type="submit" label="Login">Login</button>
        <div className="Register">Noch nicht registriert?</div>
        <button className="Button" type="button" label="Registrieren" onClick={this.props.onClick}>Jetzt registrieren</button>
      </form>
    );
  }
}
export default LoginForm;
