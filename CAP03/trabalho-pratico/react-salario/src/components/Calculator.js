import React, { Component } from 'react';

export default class Calculator extends Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col s12">
            <h1>React Salários</h1>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div className="input-field col s12">
              <input id="last_name" type="text" className="validate" />
              <label htmlFor="last_name" className="active">
                Last Name
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">1</div>
          <div class="col s3">2</div>
          <div class="col s3">3</div>
          <div class="col s3">4</div>
        </div>
        <div class="row">
          <div class="col s3">1</div>
        </div>
      </div>
    );
  }
}
