import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../logo.svg';
import './Header.css';

class Header extends Component {

  render () {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Projektmanagement </h1>
        {this.props.user &&
          <div className="Logged-in">
            <span>{this.props.user.username} </span>
            <i className="fa fa-sign-out" onClick={this.props.onSignOut}></i>
          </div>
        }
      </header>
    );
  }
}

export default Header;
