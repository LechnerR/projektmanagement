import React, { Component } from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.min.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
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

  render() {
if (this.state.user) {
  console.log("User: " + this.state.user.username);

}
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
        <Login onSignIn={this.signIn.bind(this)} />
      }
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
