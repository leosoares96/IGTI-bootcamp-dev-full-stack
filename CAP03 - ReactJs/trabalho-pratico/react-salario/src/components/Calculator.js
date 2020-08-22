import React, { Component } from 'react';
import { calculateSalaryFrom } from '../helpers/salary';
import InputFullSalary from './InputFullSalary';
import InputReadOnly from './InputReadOnly';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseINSS: 0,
      baseIRPF: 0,
      discountINSS: 0,
      discountIRPF: 0,
      netSalary: 0,
    };
  }
  handleFullSalary = (value) => {
    this.setState(calculateSalaryFrom(value));
  };

  render() {
    const {
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>React Salários</h1>
          </div>
        </div>
        <InputFullSalary onChangeSalary={this.handleFullSalary} />
        <div className="row">
          <InputReadOnly value={baseINSS} id="baseINSS" name="Base INSS" />
          <InputReadOnly
            value={discountINSS}
            id="descontoINSS"
            name="Desconto INSS"
          />
          <InputReadOnly value={baseIRPF} id="baseIRPF" name="Base IRPF" />
          <InputReadOnly
            value={discountIRPF}
            id="descontoIRPF"
            name="Desconto IRPF"
          />
        </div>
        <div className="row">
          <InputReadOnly
            value={netSalary}
            id="salarioLiquidp"
            name="Salário Liquido"
          />
        </div>
      </div>
    );
  }
}
