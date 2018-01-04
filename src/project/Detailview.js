import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Detailview extends Component {

  render () {
    return (
      <div>
        <h1>{this.props.project.title} (#{this.props.project.id})</h1>
        <p>{this.props.project.description}</p>
      </div>
    )
  }
}

export default Detailview;
