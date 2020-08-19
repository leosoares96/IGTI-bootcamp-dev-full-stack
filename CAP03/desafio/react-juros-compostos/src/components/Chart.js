import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Chart({ calcs }) {
  console.log(calcs);
  const data = {
    labels: calcs.map((calc) => calc.id),
    datasets: [
      {
        label: 'Montante',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: calcs.map((calc) => calc.acc),
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
