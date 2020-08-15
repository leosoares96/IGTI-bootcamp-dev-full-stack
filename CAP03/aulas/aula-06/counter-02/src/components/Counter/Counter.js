import React, { Component } from 'react';
import css from './counter.module.css';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };
  render() {
    const { currentCounter, steps } = this.state;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <span className={css.counterValue}>{currentCounter}</span>
        <IncrementButton onIncrement={this.handleButtonClick} />
        <span>({steps})</span>
      </div>
    );
  }
}

export default Counter;
