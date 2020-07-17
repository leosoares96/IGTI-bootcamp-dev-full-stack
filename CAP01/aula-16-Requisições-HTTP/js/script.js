window.addEventListener('load', function () {
  doFetch();
  doFetchAsync();

  divisionPromise(7, 2)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por zero');
    }
    resolve(a / b);
  });
  return a / b;
}

function doFetch() {
  fetch('https://api.github.com/users/leosoares96')
    .then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      console.error('Erro na requisição: ' + error);
    });
}

async function doFetchAsync() {
  const result = await fetch('https://api.github.com/users/leosoares96');
  console.log(result);
}
