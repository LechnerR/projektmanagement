import React, { Component } from 'react';
import './Login.css';
import Input from 'react-bootstrap';
import Button from 'react-bootstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    // this.handleSignIn = this.handleSignIn.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3 className="User">Login </h3>
        <input className="Input" type="text" ref="username" placeholder="Benutzername" required/><br />
        <input className="Input" type="password" ref="password" placeholder="Passwort" required/><br />
        <button className="Button" type="submit" label="Login">Login</button>
      </form>
    );
  }
}

export default Login;
