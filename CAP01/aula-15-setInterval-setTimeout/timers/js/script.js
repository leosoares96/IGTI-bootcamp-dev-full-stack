window.addEventListener('load', function () {
  const timer = document.querySelector('#timer');
  let count = 0;

  const interval = setInterval(() => {
    timer.textContent = count++;

    if (count === 10) {
      this.clearInterval(interval);
    }
  }, 1000);
});
