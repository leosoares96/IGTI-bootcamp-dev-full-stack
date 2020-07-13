function sum(a,b){
  return a + b;
}
console.log(sum(5,6));

function compareNumbers(a,b){
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - 0;
}
console.log(compareNumbers(4,5));
console.log(compareNumbers(6,5));
console.log(compareNumbers(5,5));

function superSum(from, upTo){
  var sum = 0;

  for(var i = from; i <= upTo; i++){
    sum += i
  }
  return sum;
}

console.log(superSum(1,100))