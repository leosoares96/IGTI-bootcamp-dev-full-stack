import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { value, id, name } = this.props;
    return (
      <div className="col s3">
        <div className="input-field col s12">
          <input
            value={value}
            id={id}
            type="text"
            className="validate"
            disabled
          />
          <label htmlFor={id} className="active">
            {name}:
          </label>
        </div>
      </div>
    );
  }
}
