import React, { Component } from 'react';
import Button from 'react-bootstrap';
import Jumbotron from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './Dashboard.css';

class Dashboard extends Component {

  render () {
    return (
      <div>
        <h2>Projektübersicht</h2>
        <AllProjects />
        <button className="Button NewProject"><i id="NewProject" className="fa fa-plus-circle"></i>neues Projekt</button>
      </div>
    );
  }
}

const ProjectAPI = {
  projects: [
    { id: 1, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt A", title:"Projekt A", notice:"Notiz" },
    { id: 2, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt B", title:"Projekt B", notice:"Notiz" },
    { id: 3, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt C", title:"Projekt C", notice:"Notiz" },
    { id: 4, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt D", title:"Projekt D", notice:"Notiz" },
    { id: 5, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt E", title:"Projekt E", notice:"Notiz" }
    // { id: 6, start_date: "1.1.2001", end_date: "1.1.2001", description:"Projekt F", title:"Projekt F", notice:"Notiz" }
  ],
  all: function() { return this.projects},
  get: function(id) {
    const isProject = p => p.id === id
    return this.projects.find(isProject)
  }
}

function AllProjects(props) {
  return (
    <Grid>
      <Row className="show-grid">
        {
          ProjectAPI.all().map(p => (
            <Col xs={6} md={4} key={p.id} className="Project">
              <div className="jumbotron">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p><button className="Details">Details</button></p>
              </div>
            </Col>
          ))
        }

      </Row>
    </Grid>
  );
}

export default Dashboard;
