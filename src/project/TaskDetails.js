import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Detailview.css';


class TaskDetails extends Component {

  render () {
    return (
      <div>
        <h1>Aufgabe 1</h1>
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Beschreibung</h3>
                  <p>Diese Aufgabe ist toll</p>
                </div>
              </Col>
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Notizen</h3>
                  <p>oder nicht</p>
                </div>
              </Col>
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Termine</h3>
                  <ul className="List">
                    <li>asdf</li>
                    <li>asdf</li>
                  </ul>
                </div>
              </Col>
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Team</h3>
                  <ul className="List">
                    <li>asdf</li>
                    <li>asdf</li>
                  </ul>
                  <div className="Container">
                    <Link to="/newEmployee" className="Button"><i id="NewProject" className="fa fa-plus-circle"></i>neuer Benutzer</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
          <Link to="/dashboard" className="Button BackButton"><i id="NewProject" className="fa fa-caret-left"></i>Zurück</Link>
      </div>
    )
  }
}

export default TaskDetails;
