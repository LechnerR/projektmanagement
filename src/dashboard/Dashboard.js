import React, {Component} from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './Dashboard.css';
import Detailview from '../project/Detailview.js';
import NewProject from '../forms/NewProject.js';
import NewTask from '../forms/NewTask.js';
import NewEmployee from '../forms/NewEmployee.js';
import TaskDetails from '../project/TaskDetails.js';

var axios = require('axios')

const Projects = () => {
    return (
        <Switch>
            <Route path='/dashboard' component={AllProjects}/>
            <Route path='/projects/:id' component={Project}/>
            <Route path='/newProject' component={NewProject}/>
            <Route path='/newTask' component={NewTask}/>
            <Route path='/newEmployee' component={NewEmployee}/>
            <Route path='/taskDetails/:id' component={TaskDetails}/>
        </Switch>
    )
}

const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

var projects = [];

class Dashboard extends Component {
    static reload = false;

    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);

    }


    componentDidMount() {
        var self = this;
        axios.get(url + 'Project')
            .then(function (response) {
                projects = response.data.Items;
                self.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    reload() {
        var self = this;
        axios.get(url + 'Project')
            .then(function (response) {
                projects = response.data.Items;
                self.forceUpdate();
                Dashboard.reload = false;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (Dashboard.reload) {
            this.reload();
        }
        return (
            <div>
                <Projects/>
            </div>
        );
    }
}

const ProjectAPI = {
    get: function (id) {
        const isProject = p => p.ID === id
        return projects.find(isProject)
    }
}


function AllProjects(props) {
    return (
        <div>
            <h2>Projektübersicht</h2>
            <Grid>
                <Row className="show-grid">
                    {
                        projects.map(p => (
                            <Col xs={6} md={4} key={p.ID} className="Project">
                                <div className="jumbotron">
                                    <h3>{p.Title}</h3>
                                    <p>{p.Description}</p>
                                    <p><Link className="Details" to={`/projects/${p.ID}`}>Details</Link></p>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Grid>
            <Link to="/newProject" className="Button NewProject"><i id="NewProject" className="fa fa-plus-circle"></i>neues
                Projekt</Link>
        </div>
    );

}


function Project(props) {
    console.log('Project - props', props);
    const project = ProjectAPI.get(
        parseInt(props.match.params.id, 10)
    )
    if (!project) {
        return <div>Sorry, but the project was not found</div>
    }
    return (
        <Detailview project={project}/>
    )
}

export default Dashboard;
