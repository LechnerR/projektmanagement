import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';
import Detailview from "../project/Detailview";
import Toggle from 'react-toggle'
import { updateTask } from '../Api.js';

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {
                Title: '',
                Description: '',
                Notice: '',
                Deadline: '',
                Milestone: false,
                ID: -1,
                Project_ID: this.props.task.Project_ID
            }
        };
    }

    handleNewTask(e) {
        e.preventDefault();

        let task = this.props.task;
        if (task) {
          this.setState({
            task: {
              Title: this.refs.taskTitle.value,
              Description: this.refs.taskDescription.value,
              Notice: this.refs.taskNotice.value,
              Deadline: this.refs.date.value,
              Milestone: this.refs.milestone.checked,
              Project_ID: this.props.task.Project_ID,
              ID: this.props.task.ID
            }
          }, function () {
            // console.log('Task updaten: ', this.state.task);
            updateTask(this.state.task);
            this.props.onClick();
          });
        } else {
          this.setState({
            task: {
              Title: this.refs.taskTitle.value,
              Description: this.refs.taskDescription.value,
              Notice: this.refs.taskNotice.value,
              Deadline: this.refs.date.value,
              Milestone: this.refs.milestone.checked,
              Project_ID: this.props.project.Items[0].ID,
              ID: new Date().valueOf()
            }
          }, function () {
            // console.log('neuer Task: ', this.state.task);
            updateTask(this.state.task);
            this.props.onClick();
          });
        }
    }

    render() {

        // if (initUpdate) {
        //     if (this.props.location.state) {
        //         if (this.props.location.state.task.ID) {
        //             updateTask = true;
        //             initUpdate = false;
        //             this.state = {
        //                 value: {
        //                     taskTitle: this.props.location.state.task.Title,
        //                     taskDescription: this.props.location.state.task.Description,
        //                     taskNotice: this.props.location.state.task.Notice,
        //                     taskDeadline: this.props.location.state.task.Deadline,
        //                     taskMilestone: this.props.location.state.task.Milestone,
        //                     projectID: this.props.location.state.task.Project_ID,
        //                     ID: this.props.location.state.task.ID
        //                 }
        //             }
        //         }
        //     }
        // }

        let task = this.props.task;
        if (!task) {
          task = this.state.task;
        }
        // console.log("Task: ", this.state.task);
        // console.log("projectID: ", this.props.task.Project_ID);

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <form className="NewProjectForm" onSubmit={this.handleNewTask.bind(this)}>
                    <input className="Input" type="text" ref="taskTitle" placeholder="Aufgabentitel"
                           defaultValue={task.Title} required/><br/>
                    <textarea className="Input" type="text" ref="taskDescription" rows="15"
                              placeholder="Aufgabenbeschreibung"
                              defaultValue={task.Description} required/><br/>
                    <textarea className="Input" type="text" ref="taskNotice" rows="10" placeholder="Aufgabennotizen"
                              defaultValue={task.Notice} /><br/>
                    <div className="Container">
                        <h3 className="Heading">Deadline</h3>
                        <input className="Input" type="date" ref="date" defaultValue={task.Deadline}
                               required/><br/>
                        <label>
                            <input type="checkbox" ref="milestone" defaultChecked={task.Milestone} />
                            als Meilenstein festlegen
                        </label><br/>
                    </div>
                    <div className="Container">
                        <button className="Button" type="submit">Speichern</button>
                      <button className="Button" type="reset" onClick={this.props.onClick}>Abbrechen</button>
                    </div>
                </form>
            </div>
        )
    }

}


export default NewTask;
