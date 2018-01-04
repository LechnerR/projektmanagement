import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Detailview.css';


class Detailview extends Component {

  render () {
    return (
      <div>
        <h1>{this.props.project.title}</h1>
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Beschreibung</h3>
                  <p>{this.props.project.description}</p>
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
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Aufgaben</h3>
                    <ul className="List">
                      <li>asdf</li>
                      <li>asdf</li>
                    </ul>                </div>
              </Col>
              <Col xs={6} md={4} className="ProjectDetails">
                <div className="jumbotron">
                  <h3>Team</h3>
                    <ul className="List">
                      <li>asdf</li>
                      <li>asdf</li>
                    </ul>                </div>
              </Col>
            </Row>
          </Grid>
          <Link to="/dashboard" className="Button NewProject"><i id="NewProject" className="fa fa-caret-left"></i>Zurück</Link>
      </div>
    )
  }
}

export default Detailview;
