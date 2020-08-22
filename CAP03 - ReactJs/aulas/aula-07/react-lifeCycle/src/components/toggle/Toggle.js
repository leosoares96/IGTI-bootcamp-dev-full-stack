import React, { Component } from 'react';

export default class Toggle extends Component {
  handleShowUsers = (event) => {
    this.props.onToggle(event.target.checked);
  };
  render() {
    return (
      <div className="switch">
        <label>
          Mostrar usuários:
          <input type="checkbox" onChange={this.handleShowUsers} />
          <span className="lever"></span>
        </label>
      </div>
    );
  }
}
