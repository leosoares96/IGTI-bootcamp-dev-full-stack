import React, { Component } from 'react';
import css from './counter.module.css';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.currentCounter = 2;
  }

  handleCLick = () => {
    console.log('click');
  };
  render() {
    return (
      <div className={css.counterContainer}>
        <button
          onClick={this.handleCLick}
          className="waves-effect waves-light btn red darken-4"
        >
          -
        </button>
        <span className={css.counterValue}>{this.currentCounter}</span>
        <button
          onClick={this.handleCLick}
          className="waves-effect waves-light btn green darken-4"
        >
          +
        </button>
      </div>
    );
  }
}

export default Counter;
