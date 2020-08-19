import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import Card from './components/Card';
import { applyRate, calcDif, calcPerc } from './helpers/calcs';

function App() {
  const [startingMoney, setStartingMoney] = useState(1000);
  const [rate, setRate] = useState(0.8);
  const [period, setPeriod] = useState(1);
  const [calcs, setCalcs] = useState([]);

  useEffect(() => {
    const acc = applyRate(startingMoney, rate);
    const dif = calcDif(acc, startingMoney);
    const perc = calcPerc(dif, startingMoney);

    const array = [
      {
        id: 1,
        acc,
        dif,
        perc,
      },
    ];
    for (let i = 1; i < period; i++) {
      const previous = array[i - 1];
      const acc = applyRate(previous.acc, rate);
      const dif = calcDif(acc, startingMoney);
      const perc = calcPerc(dif, startingMoney);
      array.push({
        id: i + 1,
        acc,
        dif,
        perc,
      });
    }
    setCalcs(array);
  }, [period, rate, startingMoney]);

  return (
    <div className="container">
      <Header />
      <div className="row">
        <Input
          value={startingMoney}
          title={'Montante inícial'}
          step={100}
          onChangeInput={setStartingMoney}
        />
        <Input
          value={rate}
          title={'Taxa de juros mensal'}
          step={0.1}
          onChangeInput={setRate}
        />
        <Input
          value={period}
          title={'Período (meses)'}
          step={1}
          onChangeInput={setPeriod}
        />
      </div>
      <div className="row">
        {calcs.map((item) => {
          return (
            <Card
              key={item.id}
              index={item.id}
              acc={item.acc}
              dif={item.dif}
              perc={item.perc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
