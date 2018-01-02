import React, { Component } from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.svg';
import './App.css';
import LoginControll from './login/LoginControll';
import Header from './header/Header';
import Form from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  signIn(username, password) {
    // call api for validating the credentials
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
    // call api for adding new user

    this.signIn(username, password);
    console.log("Registriert");
  }

  render() {

    return (
      <MuiThemeProvider>
        <div className="App">
        <Header user={this.state.user} onSignOut={this.signOut.bind(this)} />

        {
          (this.state.user) ?
          // if user show dashboard
          <h2>Dashboard</h2>

          :
          // if no user - login
          <LoginControll onSignIn={this.signIn.bind(this)} onRegistration={this.register.bind(this)} />

        }
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
