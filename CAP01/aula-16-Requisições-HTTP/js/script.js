window.addEventListener('load', function () {
  fetch('https://api.github.com/users/leosoares96').then((res) => {
    res.json().then((data) => {
      console.log(data);
    });
  });
});
