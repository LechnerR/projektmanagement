import React, { Component } from 'react';
import './Forms.css';
import Input from 'react-bootstrap';
import Button from 'react-bootstrap';
import LoginForm from './LoginForm.js';
import RegistrationForm from './RegistrationForm.js';

class LoginControll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRegistered : true
    }
  }

  register() {
    this.setState({isRegistered: false});
  }

  goBack() {
    this.setState({isRegistered: true});
  }

  render() {
    const isRegistered = this.state.isRegistered;
    let form = null;
    if (isRegistered) {
      form = <LoginForm onSignIn={this.props.onSignIn} onClick={this.register.bind(this)} />;
    } else {
      form = <RegistrationForm onRegistration={this.props.onRegistration} onClick={this.goBack.bind(this)} />;
    }
    return (
      <div>
        <Heading isRegistered={isRegistered} />
        {form}
      </div>
    );
  }
}

function LoginHeading(props) {
  return <h3>Login</h3>
}

function RegistrationHeading(props) {
  return <h3>Registrierung</h3>
}

function Heading(props) {
  if (props.isRegistered) {
    return <LoginHeading />
  }
  return <RegistrationHeading />
}

export default LoginControll;
