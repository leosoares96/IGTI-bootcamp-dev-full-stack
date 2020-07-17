window.addEventListener('load', start);

function start() {
  var [inputRed, inputGreen, inputBlue] = document.querySelectorAll(
    "input[type='range'"
  );
  var [numberRed, numberGreen, numberBlue] = document.querySelectorAll(
    "input[type='text'"
  );

  updateColor();

  inputRed.addEventListener('input', updateColor);
  inputGreen.addEventListener('input', updateColor);
  inputBlue.addEventListener('input', updateColor);

  function updateColor() {
    numberRed.value = inputRed.value;
    numberGreen.value = inputGreen.value;
    numberBlue.value = inputBlue.value;

    var boxColor = document.querySelector('#boxColor');
    var body = document.querySelector('body');
    boxColor.style.background = `rgb(${numberRed.value},${numberGreen.value},${numberBlue.value})`;
    body.style.background = `rgb(${numberRed.value},${numberGreen.value},${numberBlue.value})`;
  }
}
