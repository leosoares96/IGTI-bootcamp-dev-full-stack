import React, { Component } from 'react';
import css from './counter.module.css';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';

class Counter2 extends Component {
  handleButtonClick = (clickType) => {
    this.props.onClickButton(clickType);
  };
  render() {
    const { valueCounter, valueSteps } = this.props;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <span className={css.counterValue}>{valueCounter}</span>
        <IncrementButton onIncrement={this.handleButtonClick} />
        <span>({valueSteps})</span>
      </div>
    );
  }
}

export default Counter2;
