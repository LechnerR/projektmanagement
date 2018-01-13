import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import LoginControll from './forms/LoginControll';
import Dashboard from './dashboard/Dashboard.js';
import Header from './header/Header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  signIn(username, password) {
    // TODO call api for validating the credentials
    this.setState({
      user: {
        username,
        password
      }
    })
  }

  signOut() {
    this.setState({user: null})
  }

  register(username, password) {
    // TODO call api for adding new user

    this.signIn(username, password);
    // for testing
    console.log("Registriert");
  }

  render() {

    return (
        <div className="App">
          <Header user={this.state.user} onSignOut={this.signOut.bind(this)} />

          {
            (this.state.user) ?
            // if user show dashboard
            <div>
            <Dashboard />
            </div>

            :
            // if no user - login
            <LoginControll onSignIn={this.signIn.bind(this)} onRegistration={this.register.bind(this)} />

          }
        </div>
    );
  }
}


export default App;
