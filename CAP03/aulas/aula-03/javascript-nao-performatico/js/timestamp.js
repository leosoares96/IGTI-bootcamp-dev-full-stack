function letPad(value, count = 2, char = '0') {
  let newValue = '';

  if (value.toString().length < count) {
    for (let i = 0; i < count - value.toString().length; i++) {
      newValue += char;
    }
  }
  newValue = newValue + value;
  return newValue;
}

function getNewTimestamp() {
  const now = new Date();
  let result = '';

  result += letPad(now.getDate());
  result += '/';
  result += letPad(now.getMonth() + 1);
  result += '/';
  result += now.getFullYear();
  result += ' ';
  result += letPad(now.getHours());
  result += ':';
  result += letPad(now.getMinutes());
  result += ':';
  result += letPad(now.getSeconds());
  result += '.';
  result += letPad(now.getMilliseconds(), 3);

  return result;
}
