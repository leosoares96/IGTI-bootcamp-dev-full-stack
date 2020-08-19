const applyRate = (value, rate) => {
  //prettier-ignore
  value = Number(value);
  rate = Number(rate);
  const result = value + (value * rate) / 100;
  return result.toFixed(2);
};
const calcDif = (a, b) => {
  a = Number(a);
  b = Number(b);
  return (a - b).toFixed(2);
};

const calcPerc = (dif, total) => {
  dif = Number(dif);
  total = Number(total);
  return ((dif / total) * 100).toFixed(2);
};

const formatNumber = (value) => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export { applyRate, calcDif, calcPerc, formatNumber };
