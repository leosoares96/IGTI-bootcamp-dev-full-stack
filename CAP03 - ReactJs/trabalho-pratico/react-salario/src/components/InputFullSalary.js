import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleFullSalary = (event) => {
    const { value } = event.target;
    this.props.onChangeSalary(value);
  };
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="input-field col s12">
            <input
              onChange={this.handleFullSalary}
              id="salarioBruto"
              type="text"
              className="validate"
            />
            <label htmlFor="salarioBruto" className="active">
              Salário Bruto:
            </label>
          </div>
        </div>
      </div>
    );
  }
}
