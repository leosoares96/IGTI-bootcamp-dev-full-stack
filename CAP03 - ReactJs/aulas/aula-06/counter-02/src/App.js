import React, { Component, Fragment } from 'react';
import Counter from './components/Counter/Counter';
import Counter2 from './components/Counter/Counter2';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCounter: 3,
      steps: 0,
    };
  }
  handleClickButton = (clickType) => {
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
      <Fragment>
        <h3>Estados individuais</h3>
        <Counter />
        <Counter />
        <Counter />
        <h3>Estados compartilhados</h3>
        <Counter2
          onClickButton={this.handleClickButton}
          valueCounter={currentCounter}
          valueSteps={steps}
        />
        <Counter2
          onClickButton={this.handleClickButton}
          valueCounter={currentCounter}
          valueSteps={steps}
        />
        <Counter2
          onClickButton={this.handleClickButton}
          valueCounter={currentCounter}
          valueSteps={steps}
        />
      </Fragment>
    );
  }
}
