import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';
import Detailview from "../project/Detailview";
import Toggle from 'react-toggle'


var axios = require('axios')
const url = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'
var createTask = {};
var updateTask = false;
var initUpdate = true;

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                taskTitle: '',
                taskDescription: '',
                taskNotice: '',
                taskDeadline: '',
                taskMilestone: false,
                // projectID: this.props.location.state.task.Project_ID
            }
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleNotice = this.handleNotice.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleMilestone = this.handleMilestone.bind(this);
    }


    handleTitle(event) {
        this.setState({
            value: {
                taskTitle: event.target.value,
                taskDescription: this.state.value.taskDescription,
                taskNotice: this.state.value.taskNotice,
                taskDeadline: this.state.value.taskDeadline,
                taskMilestone: this.state.value.taskMilestone,
                projectID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        });
    }

    handleDescription(event) {
        this.setState({
            value: {
                taskTitle: this.state.value.taskTitle,
                taskDescription: event.target.value,
                taskNotice: this.state.value.taskNotice,
                taskDeadline: this.state.value.taskDeadline,
                taskMilestone: this.state.value.taskMilestone,
                projectID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        });
    }

    handleNotice(event) {
        this.setState({
            value: {
                taskTitle: this.state.value.taskTitle,
                taskDescription: this.state.value.taskDescription,
                taskNotice: event.target.value,
                taskDeadline: this.state.value.taskDeadline,
                taskMilestone: this.state.value.taskMilestone,
                projectID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        });
    }

    handleDeadline(event) {
        this.setState({
            value: {
                taskTitle: this.state.value.taskTitle,
                taskDescription: this.state.value.taskDescription,
                taskNotice: this.state.value.taskNotice,
                taskDeadline: event.target.value,
                taskMilestone: this.state.value.taskMilestone,
                projectID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        });
    }

    handleMilestone(event) {
        this.setState({
            value: {
                taskTitle: this.state.value.taskTitle,
                taskDescription: this.state.value.taskDescription,
                taskNotice: this.state.value.taskNotice,
                taskDeadline: this.state.value.taskDeadline,
                taskMilestone: event.target.checked,
                projectID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        });
    }

    render() {

        if (initUpdate) {
            // if (this.props.location.state) {
            //     if (this.props.location.state.task.ID) {
            //         updateTask = true;
            //         initUpdate = false;
            //         this.state = {
            //             value: {
            //                 taskTitle: this.props.location.state.task.Title,
            //                 taskDescription: this.props.location.state.task.Description,
            //                 taskNotice: this.props.location.state.task.Notice,
            //                 taskDeadline: this.props.location.state.task.Deadline,
            //                 taskMilestone: this.props.location.state.task.Milestone,
            //                 projectID: this.props.location.state.task.Project_ID,
            //                 ID: this.props.location.state.task.ID
            //             }
            //         }
            //     }
            // }
        }

        // let Heading = null;
        // if (this.props.location.state.task.Title) {
        //     Heading = <h2>Aufgabe ändern</h2>;
        // } else {
        //     Heading = <h2>Neue Aufgabe anlegen</h2>;
        // }

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm">
                    <input className="Input" type="text" ref="taskTitle" placeholder="Aufgabentitel"
                           defaultValue={this.state.value.taskTitle} onChange={this.handleTitle} required/><br/>
                    <textarea className="Input" type="text" ref="taskDescription" rows="15"
                              placeholder="Aufgabenbeschreibung"
                              defaultValue={this.state.value.taskDescription} onChange={this.handleDescription}
                              required/><br/>
                    <textarea className="Input" type="text" ref="taskNotice" rows="10" placeholder="Aufgabennotizen"
                              defaultValue={this.state.value.taskNotice} onChange={this.handleNotice}/><br/>
                    <div className="Container">
                        <h3 className="Heading">Deadline</h3>
                        <input className="Input" type="date" ref="date" defaultValue={this.state.value.taskDeadline}
                               onChange={this.handleDeadline} required/><br/>
                        <label>
                            <Toggle ref="milestone" defaultChecked={this.state.value.taskMilestone}
                                    onChange={this.handleMilestone}
                                    required/>
                            als Meilenstein festlegen
                        </label><br/>
                    </div>
                    <div className="Container">
                        <button className="Button" type="submit" onClick={() => {
                            this.saveValues();
                            this.createTask()
                        }}><Link to={`/projects/${this.state.value.projectID}`}>Speichern</Link></button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                    </div>
                </form>
            </div>
        )
    }

    saveValues() {
        if (updateTask) {
            createTask = {
                Title: this.state.value.taskTitle,
                Description: this.state.value.taskDescription,
                Notice: this.state.value.taskNotice,
                Deadline: this.state.value.taskDeadline,
                Milestone: this.state.value.taskMilestone,
                Project_ID: this.state.value.projectID,
                ID: this.state.value.ID
            }
        } else {
            createTask = {
                Title: this.state.value.taskTitle,
                Description: this.state.value.taskDescription,
                Notice: this.state.value.taskNotice,
                Deadline: this.state.value.taskDeadline,
                Milestone: this.state.value.taskMilestone,
                Project_ID: this.state.value.projectID,
                ID: new Date().valueOf()
            }
        }


    }

    createTask() {
        if (updateTask) {
            updateTask = false;
            initUpdate = true;
        }
        Detailview.reload = true;
        axios.post(url + 'ProjectTask', createTask)
            .then(response => {
                console.log('Aufgabe erfolgreich erstellt', response)
            })
            .catch(error => {
                console.log(error)
            });
    }
}


export default NewTask;
